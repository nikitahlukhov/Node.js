const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const validation = require('../reqValidation/validation');

router.post('/registration', validation.registration, async (req, res) => {
  try {
    await User.exists({login: req.body.login})
        .then((result) => {
          if (result) {
            return res.status(409).send('such user exists');
          }
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          User.create(req.body)
              .then((user) => {
                user.type === 'driver' ? user.status = 'IS' : delete user.status;
                user.save();
                res.sendStatus(200);
              });
        });
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
