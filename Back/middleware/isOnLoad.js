const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    await User.findOne({_id: req.userId}, (err, user) => {
      if (user.status === 'OL') {
        return res.status(400).json({'status':
        'Driver is on load'});
      }
      next();
    });
  } catch (err) {
    console.log(err);
  };
};
