const express = require('express');
const router = express.Router();
const fs = require('fs');

const checkToken = require('../auth/auth');

router.get('/auth', checkToken, (req, res) => {
    if (req.user.username) {
       return res.json(req.user.username) 
    } else {
        res.sendStatus(400)
    }   
});

module.exports = router;
