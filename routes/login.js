// core
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// model
const User = require('../models/user');
// validation
const validation = require('../reqValidation/validation');

const errorMessage = 'wrong login or password';


router.post('/auth/login', validation.login, async (req, res) => {
  try {
    await User.findOne({username: req.body.username}, (err, user) => {
      if (!user) {
        return res.status(409).send(errorMessage);
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          return res.status(409).send(errorMessage);
        }
        const jwtToken = jwt.sign({user}, config.get('secret'));
        res.status(200).json({
          'status': 'User authenticated successfully',
          'token': jwtToken,
        });
      });
    });
  } catch (err) {
    res.send(err);
    console.log(err);
  };
});

module.exports = router;
