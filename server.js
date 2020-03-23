const express = require('express');
const app = express();
const PORT = 8000;

const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');
const todoListRouter = require('./routes/todoList');

app.use(express.json());

app.use('/', express.static('assets'));
app.use('/login', express.static('assets/login'));
app.use('/registration', express.static('assets/registration'));
app.use('/todoList', express.static('assets/todoList'));

/* app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
}); */

app.use('/api', loginRouter);
app.use('/api', registrationRouter);
app.use('/api', todoListRouter);


app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);