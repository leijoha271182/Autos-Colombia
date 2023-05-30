const mongoose = require('mongoose');
//factura
const TiqueteSchema = mongoose.Schema({
    codigoFactura:{
        type:String,
        required:true
    },
    horaEntrada:{
        type:String,
        required:true
    },
    horaSalida:{
        type:String,
        required:true
    },
    suscripcion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Suscripcion',
        required:true
    },
    vehiculo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vehiculo',
        required:true
    },
    celda:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('Tiquete', TiqueteSchema);