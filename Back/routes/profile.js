const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/profile/:userId', async (req, res) => {
  try {
    await User.findById(req.params.userId)
        .then((result) => {
          res.json({
            login: result.login,
          });
        });
  } catch (err) {
    console.log(err);
  };
});

// change password
router.put('/profile/:userId', async (req, res) => {
  try {
    await User.findById(req.params.userId)
        .then((user) => {
          bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
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

router.delete('/profile/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json('user has been deleted');
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
