var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usuario = new Schema({
    nombre: String,
    apellido: String,
    usuario: String,
    contrasena: String,
    email: String,
    direccion: String,
    pais: String,
    estado: String,
    codigo_postal: Number,
    mayor_edad: Boolean
});


module.exports = mongoose.model("Usuario", usuario);