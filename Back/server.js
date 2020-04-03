const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');

const PORT = config.get('PORT');
const registration = require('./routes/registration');
const login = require('./routes/login');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const trucks = require('./routes/trucks');
const loadsShipper = require('./routes/loadsShipper');
const loadsDriver = require('./routes/loadsDriver');
const logs = require('./middleware/logs');

app.use(express.json());
app.use(logs);

// connect to mongoDB
mongoose.connect(config.get('mongoPort'),
    {useUnifiedTopology: true,
      useNewUrlParser: true,
    });

app.use('/api', registration);
app.use('/api', login);
app.use('/api', auth);
app.use('/api', profile);
app.use('/api', trucks);
app.use('/api', loadsShipper);
app.use('/api', loadsDriver);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server is listening on PORT: ${PORT}`);
});
