const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');

const {
  filterDealsController,
  initDealsController
} = require('./controllers');
const {
  filterDealsSchema,
} = require('./joi/validationSchemas');
const {
  DEALS_FILTER_DEALS,
  DEALS_INIT_DEALS
} = require('./endPoints');

const router = express.Router();

router.get(
  '/init',
  initDealsController
);
router.get(
  '/',
  requestValidator(filterDealsSchema),
  filterDealsController
);

module.exports = router;
