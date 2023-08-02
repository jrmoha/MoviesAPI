import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/index.js';

const errorHandlerMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode as number)
      .json({ success: false, error: err.message });
  }
  return res
    .status(500)
    .json({ success: false, error: 'Something went wrong.' });
};

export default errorHandlerMiddleware;