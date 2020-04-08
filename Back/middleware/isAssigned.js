const Truck = require('../models/trucks');

module.exports = async (req, res, next) => {
  try {
    await Truck.findById(req.params.id)
        .then((truck) => {
          truck.assigned_to == null ? next() : res.status(400).json({'status':
            'truck is assigned'});
        });
  } catch (err) {
    console.log(err);
  };
};
