import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandlers';
import router from './app/Routes';
import cookieParser from 'cookie-parser';

const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    StatusCode: StatusCodes.NOT_FOUND,
    message: 'Route not found',
  });
});

export default app;
