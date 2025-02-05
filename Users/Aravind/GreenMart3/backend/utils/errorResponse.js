// utils/errorResponse.js
const errorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ message });
};

module.exports = errorResponse;
