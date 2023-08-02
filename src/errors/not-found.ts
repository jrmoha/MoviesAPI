import { StatusCodes } from 'http-status-codes';
import { CustomError } from './CustomError.js';
class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
