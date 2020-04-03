const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi);

const registrationSchema = joi.object({
  login: joi.string().required(),
  password: joi.string().required(),
  type: joi.string().required(),
});

const loginSchema = joi.object({
  login: joi.string().required(),
  password: joi.string().required(),
});

const changePasswordSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

const createLoadSchema = joi.object({
  name: joi.string(),
  dimensions: joi.object({
    width: joi.string().required(),
    length: joi.string().required(),
    height: joi.string().required(),
  }),
  payload: joi.number(),
});

const updateLoadSchema = joi.object({
  name: joi.string().required(),
  dimensions: joi.object({
    width: joi.string().required(),
    length: joi.string().required(),
    height: joi.string().required(),
  }),
  payload: joi.number().required(),
});

const createTruckSchema = joi.object({
  type: joi.string(),
  name: joi.string(),
});

const updateTruckSchema = joi.object({
  name: joi.string(),
  type: joi.string(),
});

module.exports = {
  registrationSchema,
  loginSchema,
  changePasswordSchema,
  createLoadSchema,
  updateLoadSchema,
  createTruckSchema,
  updateTruckSchema,
};
