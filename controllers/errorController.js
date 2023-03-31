module.exports = (err, req, res, next) => {
  err.statusCode = err.seratusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
