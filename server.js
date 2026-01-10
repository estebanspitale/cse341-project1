console.log('SERVER FILE LOADED');

const express = require('express');
const app = express();
require('dotenv').config();

const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', contactsRoutes);

const port = process.env.PORT || 8080;

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('ABOUT TO START SERVER');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
