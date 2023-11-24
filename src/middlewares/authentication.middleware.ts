import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../@types/user_type.js';

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, config.jwtSecret!);
    req.user = verified as User;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default authenticationMiddleware;
