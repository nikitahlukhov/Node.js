const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const checkToken = require('../auth/auth');

const USERS_FILE_NAME = './users.json';

/* router.get('/todoList/:id', (req, res) => {
    res.sendFile(path.resolve('./assets/todoList/todoList.html'));
}); */

router.put('/todoList/:id', (req, res) => {
    let newTasks = {
        tasks: req.body,
    };
    fs.readFile(USERS_FILE_NAME, 'utf8', (err, data) => {
        let fileData = JSON.parse(data);
        for (let i = 0; i < fileData.users.length; i++) {
            if (fileData.users[i].username == req.params.id) {
                fileData.users[i].tasks = newTasks.tasks;
            }
        }
 
    fs.writeFile(USERS_FILE_NAME, JSON.stringify(fileData), () => {});   
        res.sendStatus(200)
    })
});

router.get('/auth', checkToken, (req, res) => {
    

    if (req.user.username) {
       return res.sendStatus(200) 
    } else {
        res.sendStatus(400)
    }

    
    
});

module.exports = router;