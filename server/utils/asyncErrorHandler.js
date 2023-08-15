const asyncErrorHandler = (callbackFunction) => {
  return (req, res, next) => {
    Promise.resolve(callbackFunction(req, res, next)).catch(next);
  };
};

module.exports = asyncErrorHandler;
