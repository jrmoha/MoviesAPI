import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../@types/user_type.js';

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.header('auth-token') ||
    `
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNhOGY0ZjUzYTQ3MWQ4OTQxZjYxZjQiLCJ1c2VybmFtZSI6Ik1vc3RhZmEzIiwiZW1haWwiOiJkYXNoMkBnb29nbGUuY29tIiwiYWdlIjoyMSwiZmF2b3JpdGVNb3ZpZXMiOlszNDY2OThdLCJpYXQiOjE2OTEwNjYxMjd9.7yaZnVCFa80XUNBDdnHjWwUsM8P3U3XmjHqP9XadKtQ
  `;
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, config.jwtSecret!);
    req.user = verified as User;
    console.log('All good in authenticationMiddleware');
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default authenticationMiddleware;
