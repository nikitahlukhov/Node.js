const Truck = require('../models/trucks');

module.exports = async (req, res, next) => {
  try {
    await Truck.findById(req.params.truckId)
        .then((truck) => {
          truck.assigned_to == null ? next() : res.json('truck is assigned');
        });
  } catch (err) {
    console.log(err);
  };
};
