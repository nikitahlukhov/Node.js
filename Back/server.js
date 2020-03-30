const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');

const PORT = '8000';
const registrationRouter = require('./routes/registration');
const login = require('./routes/login');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const trucks = require('./routes/trucks');

app.use(express.json());

// connect to mongoDB
mongoose.connect(config.get('mongoPort'),
    {useUnifiedTopology: true,
      useNewUrlParser: true,
    });

app.use('/api', registrationRouter);
app.use('/api', login);
app.use('/api', auth);
app.use('/api', profile);
app.use('/api', trucks);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
