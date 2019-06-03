const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoria = new Schema({
    descripcion: {
        unique: true,
        required: [true, 'La descripción es obligatoria'],
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },


});

module.exports = mongoose.model('Categoria', categoria);