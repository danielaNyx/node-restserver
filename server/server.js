require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
//Paquete de node por defecto
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Habilitar el middleware para que la carpeta public sea visible
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuracion global de rutas
app.use(require('./routes/index'));

// Conexion con la BD
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

    if (err) {
        throw new Error(err);
    } else {
        console.log('Base de datos ONLINE');
    }

});



app.listen(process.env.PORT, () => {

    console.log('Escuchando puerto: ', process.env.PORT);

});