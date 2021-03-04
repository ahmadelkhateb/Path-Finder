const Joi = require('@hapi/joi');

const geoLocation = Joi.array()
  .length(2)
  .items(Joi.number());
module.exports = {
  /**
   * Id schema
   */
  idSchema: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  /**
   * Activation schema
   */
  activationSchema: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    body: Joi.object().keys({
      isActive: Joi.boolean().required()
    })
  },
  /**
   * address schema
   */
  addressSchema: Joi.object()
    .optional()
    .keys({
      country: Joi.string().required(),
      city: Joi.string().required(),
      area: Joi.string().required(),
      addressLine: Joi.string().required(),
      geoLocation: geoLocation.optional(),
      polygon: Joi.array()
        .items(geoLocation)
        .optional()
    }),
  /**
   * address schema
   */
  unitValueSchema: Joi.object()
    .optional()
    .keys({
      value: Joi.string().required(),
      unit: Joi.string().required()
    })
};
