const express = require('express');
const router = express.Router();
const fs = require('fs');

const USERS_FILE_NAME = './users.json';

router.post('/tasks/:id', (req, res) => {
    
    fs.readFile(USERS_FILE_NAME, 'utf8', (err, data) => {
        let fileData = JSON.parse(data);
        let newTask = req.body;
        for (let i = 0; i < fileData.users.length; i++) {
            if (fileData.users[i].username == req.params.id) {
                fileData.users[i].tasks.push(newTask)
            }
        }
 
    fs.writeFile(USERS_FILE_NAME, JSON.stringify(fileData), () => {});   
    })

    res.sendStatus(200)
});

router.get('/tasks/:id', (req, res) => {
    
    fs.readFile(USERS_FILE_NAME, 'utf8', (err, data) => {
        let fileData = JSON.parse(data);
        let tasks
        
        for (let i = 0; i < fileData.users.length; i++) {
            if (fileData.users[i].username == req.params.id) {
                tasks = fileData.users[i].tasks;
            }
        }
        res.json(tasks)
    })   
});

router.delete('/tasks/:id/:taskIndex', (req, res) => {
    
    fs.readFile(USERS_FILE_NAME, 'utf8', (err, data) => {
        let index = req.params.taskIndex;
        let fileData = JSON.parse(data);
        
        for (let i = 0; i < fileData.users.length; i++) {
            if (fileData.users[i].username == req.params.id) {
                fileData.users[i].tasks.splice(index, 1)
            }
        }

    fs.writeFile(USERS_FILE_NAME, JSON.stringify(fileData), () => {});   
    })

    res.sendStatus(200)
});

module.exports = router;
