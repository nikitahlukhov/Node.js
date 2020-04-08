const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const [tokenType, jwtToken] = req.headers['authorization'].split(' ');
  const user = jwt.verify(jwtToken, config.get('secret'));

  if (user.user.role === 'driver') {
    return next();
  }
  res.status(403).json({'status': 'no auth'});
  throw new Error;
};
