/* eslint-disable no-unused-vars */
const { OK } = require('http-status-codes');

// @desc App health check
const healthCheck = (req, res, next) => {
  return res.status(OK).json({
    status: true,
    message: 'App is up & running.',
    data: null
  });
};

module.exports = healthCheck;
