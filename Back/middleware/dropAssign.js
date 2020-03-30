const Truck = require('../models/trucks');

module.exports = async (req, res, next) => {
  try {
    await Truck.findOne({assigned_to: req.params.userId}, (err, truck) => {
      if (!truck) {
        return next();
      }
      truck.assigned_to = null;
      truck.save(() => {
        next();
      });
    });
  } catch (err) {
    console.log(err);
  };
};
