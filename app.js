const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 
const contactRoutes = require('./routes/contactRoutes');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB 
mongoose.connect('mongodb://host.docker.internal:27017/contactsDB')
  .then(() => console.log('¡Conectado a MongoDB exitosamente!'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Configuración de rutas de la API
app.use('/api/contacts', contactRoutes);

// Servir los archivos estáticos del frontend construido por Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta de fallback (Catch-all) para que React Router maneje las URLs en Express 5
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});