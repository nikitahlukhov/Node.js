// core
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// model
const User = require('../models/user');
// validation
const validation = require('../reqValidation/validation');

router.post('/auth/register', validation.registration, async (req, res) => {
  try {
    await User.exists({username: req.body.username})
        .then((result) => {
          if (result) {
            return res.status(409).send('such user exists');
          }
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          User.create(req.body)
              .then((user) => {
                if (user.role === 'driver') {
                  user.status = 'IS';
                  user.save();
                  return res.status(200).json({'status':
                  'User registered successfully'});
                };
                delete user.status;
                user.save();
                res.status(200).json({'status':
                'User registered successfully'});
              });
        });
  } catch (err) {
    res.send(err);
    console.log(err);
  };
});

module.exports = router;
