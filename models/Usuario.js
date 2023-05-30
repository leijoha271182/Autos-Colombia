const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nombreCompleto:{
        type:String,
        required:true
    },
    cedula:{
        type:String,
        required:true
    },
    telefono:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    tipoUsuario:{
        type: String,
        required: true,
        enum: [
            'Empleado',
            'Cliente'
        ]
    }
    
});

module.exports = mongoose.model('Usuario', UsuarioSchema);