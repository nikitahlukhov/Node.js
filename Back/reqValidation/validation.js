const schemes = require('./schemes');

const registration = async (req, res, next) => {
  try {
    await schemes.registrationSchema.validateAsync(req.body);
  } catch (err) {
    return console.log(err);
  }
  next();
};

const login = async (req, res, next) => {
  try {
    await schemes.loginSchema.validateAsync(req.body);
  } catch (err) {
    return console.log(err);
  }
  next();
};

const changePassword = async (req, res, next) => {
  try {
    await schemes.changePasswordSchema.validateAsync(req.body);
  } catch (err) {
    return console.log(err);
  }
  next();
};

const createLoad = async (req, res, next) => {
  try {
    await schemes.createLoadSchema.validateAsync(req.body);
  } catch (err) {
    return console.log(err);
  }
  next();
};

const updateLoad = async (req, res, next) => {
  try {
    await schemes.updateLoadSchema.validateAsync(req.body);
  } catch (err) {
    return console.log(err);
  }
  next();
};

const createTruck = async (req, res, next) => {
  try {
    await schemes.createTruckSchema.validateAsync(req.body);
  } catch (err) {
    return console.log(err);
  }
  next();
};

const updateTruck = async (req, res, next) => {
  try {
    await schemes.updateTruckSchema.validateAsync(req.body);
  } catch (err) {
    return console.log(err);
  }
  next();
};

module.exports = {
  registration,
  login,
  changePassword,
  createLoad,
  updateLoad,
  createTruck,
  updateTruck,
};
