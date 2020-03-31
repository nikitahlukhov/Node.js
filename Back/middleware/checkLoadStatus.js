const Load = require('../models/loads');

module.exports = async (req, res, next) => {
  try {
    await Load.findById(req.params.loadId)
        .then((load) => {
          load.status == 'NEW' ? next() : res.json('load is not NEW');
        });
  } catch (err) {
    console.log(err);
  };
};
