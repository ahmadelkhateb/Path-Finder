const Joi = require('@hapi/joi');
const filters = require('../enum/filters');

module.exports = {

  /**
   * Fetch Deal schema
   */
  filterDealsSchema: {
    query: Joi.object().keys({
      from: Joi.string().required(),
      to: Joi.string().required(),
      filter: Joi.string().valid(...Object.values(filters)).required(),
    }).required()
  },

};
