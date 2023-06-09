const mongoose = require('mongoose');

const TarifaSchema = mongoose.Schema({
    tipoVehiculo:{
        type:String,
        required:true,
        enum: [
            'Carro',
            'Moto'
        ]
    },
    precio:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Tarifas', TarifaSchema);