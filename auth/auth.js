const jwt = require('jsonwebtoken');
const secret = require('./secret').secret;

module.exports = (req, res, next) => {
    const [jwt_token] = req.headers['authorization'].split(' ');
    let user = jwt.verify(jwt_token, secret);
    req.user = user;
    next();   
};