const mongoose = require('mongoose');
//factura
const FacturaSchema = mongoose.Schema({
    codigoFactura:{
        type:String,
        required:true
    },
    horaSalida:{
        type:String,
        required:true
    },
    placa: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Factura', FacturaSchema);