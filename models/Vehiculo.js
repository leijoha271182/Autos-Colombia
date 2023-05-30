const mongoose = require('mongoose');

const VehiculoSchema = mongoose.Schema({
    placa:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        required:true,
        enum:[
            'Moto',
            'Carro'
        ]
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }

});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);
