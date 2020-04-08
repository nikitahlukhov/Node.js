const Load = require('../models/loads');

module.exports = async (req, res, next) => {
  try {
    await Load.findById(req.params.id)
        .then((load) => {
          load.status === 'ASSIGNED' ? next() : res.status(400).json({'status':
            'load is NOT active'});
        });
  } catch (err) {
    console.log(err);
  };
};
