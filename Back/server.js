// core
const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');
const PORT = config.get('PORT');
// routes import
const registration = require('./routes/registration');
const login = require('./routes/login');
const profile = require('./routes/profile');
const trucks = require('./routes/trucks');
const loads = require('./routes/loads');
const logs = require('./middleware/logs');
// middleware
app.use(express.json());
app.use(logs);

// connect to mongoDB
mongoose.connect(config.get('mongoPort'),
    {useUnifiedTopology: true,
      useNewUrlParser: true,
    });

// routes
app.use('/api', registration);
app.use('/api', login);
app.use('/api', profile);
app.use('/api', trucks);
app.use('/api', loads);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is listening on PORT: ${PORT}`);
});
