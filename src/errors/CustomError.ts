class CustomError extends Error {
  statusCode: Number;
  constructor(message: string | undefined, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg: any, statusCode: any) => {
  return new CustomError(msg, statusCode);
};

export { createCustomError, CustomError };
