// core
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// model
const User = require('../models/user');
// middleware
const checkToken = require('../middleware/checkToken');
const isShipper = require('../middleware/isShipper');
// validation
const validation = require('../reqValidation/validation');

// profile info
router.get('/profile', checkToken, async (req, res) => {
  try {
    await User.findById(req.userId)
        .then((result) => {
          res.status(200).json(result);
        });
  } catch (err) {
    console.log(err);
  };
});

// change password
router.put('/profile/changePassword',
    validation.changePassword,
    checkToken,
    async (req, res) => {
      try {
        await User.findById(req.userId)
            .then((user) => {
              bcrypt.compare(req.body.oldPassword, user.password,
                  (err, result) => {
                    if (!result) {
                      return res.status(409).send('Old password is wrong');
                    }
                    user.password = bcrypt.hashSync(req.body.newPassword, 10);
                    user.save();
                    res.status(200).json({'status':
                    'password has been changed'});
                  });
            });
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

// delete profile
router.delete('/profile', checkToken, isShipper, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.status(200).json('user has been deleted');
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
