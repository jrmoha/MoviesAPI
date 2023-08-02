import { StatusCodes } from 'http-status-codes';
import { CustomError } from './CustomError.js';

class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnauthenticatedError;
