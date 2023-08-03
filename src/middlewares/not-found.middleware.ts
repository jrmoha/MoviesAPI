import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/index.js';

const notFoundMiddleware = (
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.status(404).json({
    success: false,
    error: new NotFoundError("This Route Doesn't Exist."),
  });
};
export default notFoundMiddleware;
