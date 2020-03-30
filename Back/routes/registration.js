const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/registration', async (req, res) => {
  try {
    await User.exists({login: req.body.login})
        .then((result) => {
          if (result) {
            return res.json('User with such username exists');
          }
          req.body.password = bcrypt.hashSync(req.body.password, 10);
          req.body.status = req.body.type === 'driver' ? 'IS' : undefined;
          User.create(req.body)
              .then((user) => {
                res.send(user);
              });
        });
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
