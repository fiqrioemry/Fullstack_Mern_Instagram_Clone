const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minute
  max: 50, // maximum 50 request per 20 minute
  message: 'Too many requests from this IP, please try again later.',
  headers: true,
});

module.exports = limiter;
