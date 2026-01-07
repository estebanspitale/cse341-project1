const express = require('express');
const app = express();
require('dotenv').config();

const contactsRoutes = require('./routes/contacts');

app.use(express.json());

// Ruta requerida por el PASO 2
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Rutas del proyecto
app.use('/contacts', contactsRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});