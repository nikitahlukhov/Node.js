const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const checkToken = require('../middleware/checkToken');
const validation = require('../reqValidation/validation');

// profile info
router.get('/profile', checkToken, async (req, res) => {
  try {
    await User.findById(req.userId)
        .then((result) => {
          res.json({result});
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
                      return res.json('Old password is wrong');
                    }
                    user.password = bcrypt.hashSync(req.body.newPassword, 10);
                    user.save();
                    res.json(user);
                  });
            });
      } catch (err) {
        console.log(err);
      };
    });

// delete profile
router.delete('/profile', checkToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json('user has been deleted');
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
