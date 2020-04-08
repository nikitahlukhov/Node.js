const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi);

const registrationSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().required(),
});

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const changePasswordSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

const createLoadSchema = joi.object({
  name: joi.string(),
  dimensions: joi.object({
    width: joi.number().required(),
    length: joi.number().required(),
    height: joi.number().required(),
  }),
  payload: joi.number(),
});

const updateLoadSchema = joi.object({
  name: joi.string().required(),
  dimensions: joi.object({
    width: joi.number().required(),
    length: joi.number().required(),
    height: joi.number().required(),
  }),
  payload: joi.number().required(),
});

const createTruckSchema = joi.object({
  type: joi.string().required(),
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
