var express = require("express");
var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
var ejs = require('ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/'));

const modeloUsuario = require('./src/models/Usuario');

mongoose.connect("mongodb+srv://bootcamp:Bootcamp123.@cluster0.1a8rx.mongodb.net/ejLogin?retryWrites=true&w=majority")
    .then(function(bd) {
        console.log("Funciona");
    })
    .catch(function(err) {
        console.log(err);
    });



app.get('/', function(req, res) {
    res.render('index', {error: false});
});

app.post('/postUsuario/:id', async function(req, res) {
    const resultado = await modeloUsuario.findById(req.params.id);
    resultado.nombre = req.body.nombre;
    resultado.apellido = req.body.apellido;
    resultado.usuario = req.body.usuario;
    resultado.email = req.body.email;
    resultado.direccion = req.body.direccion;
    resultado.pais = req.body.pais;
    resultado.estado = req.body.estado;
    resultado.codigo_postal = req.body.codigo_postal;
    await resultado.save();
    res.redirect("/");
});

app.post('/buscarUsuario', async function(req,res) {
    let busqueda  = await modeloUsuario.find({
        $and:[
            {contrasena: req.body.contrasena},
            {email: req.body.email}
        ]
    });
    if(busqueda.length > 0){
        res.render("formulario",{usuario: busqueda});
    }else res.render("index",{error: true});
});




app.listen(2000);