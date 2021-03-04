const { OK, BAD_REQUEST } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const dealsData = require('../../../common/config/response.json');
const DealsService = require('../services/dealsService');
// @desc  Get Deals
// @route Get /api/v0/deals
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const DealsObject = new DealsService(dealsData.deals);
  const cities = DealsObject.getCities();
  return res.status(OK).json({
    status: true,
    message: 'Deal initialized successfully.',
    data: Array.from(cities)
  });
});
