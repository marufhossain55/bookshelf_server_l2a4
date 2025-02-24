/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../Errors/appError';
import { BookModel } from '../book/book.model';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { orderModel } from './order.model';
import { orderUtils } from './order.utils';
import { Types } from 'mongoose';

const createOder = async (
  user: TUser,
  payload: { products: { _id: string; quantity: number }[] },
  client_ip: string
) => {
  const id = user?._id;
  const userData = await User.findById(id);
  if (!payload?.products?.length)
    throw new AppError(403, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await BookModel.findById(item._id);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    })
  );

  const transformedProducts: any[] = [];

  productDetails.forEach((product) => {
    transformedProducts.push({
      product: product?._id,
      quantity: product?.quantity,
    });
  });

  let order = await orderModel.create({
    user: id,
    products: transformedProducts,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: userData?.name,
    customer_address: userData?.address,
    customer_email: userData?.email,
    customer_phone: userData?.phone,
    customer_city: userData?.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const getUserAllOrder = async (user: TUser) => {
  const result = await orderModel.find({ user: user?._id }).populate('user');

  return result;
};
const getAdminAllOrder = async () => {
  const totalRevenue = await orderModel.aggregate([
    {
      $unwind: '$products',
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
        totalSell: { $sum: '$products.quantity' },
      },
    },
    {
      $project: { _id: 0, totalRevenue: 1, totalSell: 1 },
    },
  ]);

  const allOrders = await orderModel.find().populate('user');
  return {
    allOrders,
    totalRevenue: totalRevenue[0] || { totalRevenue: 0, totalSell: 0 },
  };
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment[0]?.customer_order_id) {
    const findOrder = await orderModel.findById(
      verifiedPayment[0]?.customer_order_id
    );
    for (const item of findOrder?.products as {
      product: Types.ObjectId;
      quantity: number;
    }[]) {
      const book = await BookModel.findById(item.product);
      if (!book || book.quantity < item.quantity) {
        throw new AppError(
          StatusCodes.CONFLICT,
          `Not enough stock for ${book?.name}`
        );
      }

      book.quantity -= item.quantity;
      if (book.quantity === 0) {
        book.inStock = false;
      }
      console.log(book, 'book');
      await book.save();
    }
  }

  if (verifiedPayment?.length) {
    await orderModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
            ? 'Pending'
            : verifiedPayment[0].bank_status == 'Cancel'
            ? 'Cancelled'
            : '',
      }
    );
  }

  return verifiedPayment;
};

export const orderService = {
  createOder,
  verifyPayment,
  getAdminAllOrder,
  getUserAllOrder,
};
