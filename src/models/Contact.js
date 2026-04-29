const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  nombre: String,
  apellido: String,
  correo: String,
  celular: String,
  dni: String
});

module.exports = mongoose.model('Contact', ContactSchema);