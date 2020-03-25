const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const USERS_FILE_NAME = './users.json';
const SECRET = require('../auth/secret').secret;

router.post('/login', (req, res) => {
    let userLogin = {
        username: req.body.username,
        password: req.body.password,
    };

    fs.readFile(USERS_FILE_NAME, 'utf8', (err, data) => {
        if (err) {
            return res.sendStatus(400)
        }

        let usersList = JSON.parse(data);

        let [user] = usersList.users.filter(user => (user.username === userLogin.username && user.password === userLogin.password));

        if(!user){
          return res.sendStatus(400)
        }
        
        let jwt_token = jwt.sign(user, SECRET);
        res.json({jwt_token})
       
    })
});

module.exports = router;
