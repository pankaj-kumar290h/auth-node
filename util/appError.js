class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperatinal = true;

    //error.stack to find where erroe is generated

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
