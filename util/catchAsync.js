const catchAsync = (fu) => {
  return (req, res, next) => {
    fn(req, req, next).catch((err) => next(err));
  };
};

module.exports = catchAsync;
