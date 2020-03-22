const express = require('express');
const app = express();
const PORT = 8000;

const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');
const todoListRouter = require('./routes/todoList');

app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/assets/index.html');
});

app.use('/api', loginRouter);
app.use('/api', registrationRouter);
app.use('/api', todoListRouter);


app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);