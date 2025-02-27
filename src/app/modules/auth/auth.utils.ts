// import jwt from 'jsonwebtoken';
// export const createToken = (
//   jwtPayload: Record<string, unknown>,
//   secret: string,
//   expiresIn: string
// ) => {
//   return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn });
// };

import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: Record<string, unknown>,
  secret: Secret,
  expiresIn: SignOptions['expiresIn']
): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(jwtPayload, secret, options);
};
