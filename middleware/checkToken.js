const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const [tokenType, jwtToken] = req.headers['authorization'].split(' ');
  const user = jwt.verify(jwtToken, config.get('secret'));
  req.userId = user.user._id;
  req.userRole = user.user.role;
  next();
};
