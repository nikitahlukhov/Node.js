const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const errorMessage = 'Username or password is wrong';
const validation = require('../reqValidation/validation');

router.post('/login', validation.login, async (req, res) => {
  try {
    await User.findOne({login: req.body.login}, (err, user) => {
      if (!user) {
        return res.json(errorMessage);
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          return res.json(errorMessage);
        }
        const jwtToken = jwt.sign({user}, config.get('secret'));
        res.json({jwtToken});
      });
    });
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
