const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const USERS_FILE_NAME = './users.json';

/* router.get('/registration', (req, res) => {
    res.sendFile(path.resolve('./assets/registration/registration.html'));
}); */

router.post('/registration', (req, res) => {
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        tasks: [],
    };

    fs.readFile(USERS_FILE_NAME, 'utf8', (err, data) => {
        let test;
        if (err) {
            test = {
                users: [],
            };
            test.users.push(newUser);
            fs.writeFile(USERS_FILE_NAME, JSON.stringify(test), () => {});
            res.sendStatus(200)
            return;
        }
        
        let usersList = JSON.parse(data);

        let [user] = usersList.users.filter(user => (user.username === newUser.username));

        if(user){
          return res.sendStatus(400)
        }

        usersList.users.push(newUser);
        fs.writeFile(USERS_FILE_NAME, JSON.stringify(usersList), () => {});
        res.sendStatus(200)

        
    })

    
    
});

module.exports = router;

