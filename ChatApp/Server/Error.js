// custom error class
class CustomError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
// async wraper function
const asyncWrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Error handler middleware
const ErrorHandler = (err, req, res, next) => {
  console.log("----- Error ------");
  const { status = 500, message = "Internal server error!" } = err;
  res.status(status).json({ status: "fail", message });
};

module.exports = {
  CustomError,
  asyncWrap,
  ErrorHandler,
};
