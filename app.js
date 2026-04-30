const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB 
mongoose.connect('mongodb://host.docker.internal:27017/contactsDB')
  .then(() => console.log('¡Conectado a MongoDB exitosamente!'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Configuración de rutas
app.use('/api/contacts', contactRoutes);

// Iniciar servidor
app.listen(3000, () => {
    console.log('API REST corriendo en http://localhost:3000');
});