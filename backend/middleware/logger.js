const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'audit.log' })],
});

module.exports = (req, res, next) => {
  logger.info({
    event: 'request',
    method: req.method,
    url: req.url,
    user: req.user?.username,
    body: req.body,
    timestamp: new Date().toISOString(),
  });
  next();
};