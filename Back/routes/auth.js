const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken');

router.get('/auth', checkToken, (req, res) => {
  if (!req.userId) {
    res.json('No permission');
  }
  res.json(req.userId);
});

module.exports = router;
