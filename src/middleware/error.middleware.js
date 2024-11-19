const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.type == "ValidationError") {
    return res.status(400).json({
      success: "false",
      error: err.message,
    });
  }

  return res.status(500).json({
    success: "false",
    error: "Internal Server Error",
  });
};

module.exports = errorHandler;
