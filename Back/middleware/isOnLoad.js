const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    await User.findOne({_id: req.userId}, (err, user) => {
      if (user.status === 'OL') {
        return res.json('Driver is on load');
      }
      next();
    });
  } catch (err) {
    console.log(err);
  };
};
