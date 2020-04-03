const Truck = require('../models/trucks');

module.exports = async (req, res, next) => {
  try {
    await Truck.findOne({assigned_to: req.userId}, (err, truck) => {
      if (!truck) {
        return next();
      }
      truck.assigned_to = null;
      truck.isAssigned = false;
      truck.save(() => {
        next();
      });
    });
  } catch (err) {
    console.log(err);
  };
};
