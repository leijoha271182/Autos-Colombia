const Vehiculo = require('../models/Vehiculo');

const getAll = async (req, res) =>{
    try {
        
        const response = await Vehiculo.find().populate([
            {
                path: 'usuario',
                select: 'nombreCompleto cedula telefono email tipoUsuario'
            }
        ]);
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Vehiculo.findById({ _id : id }).populate([
            {
                path: 'usuario',
                select: 'nombreCompleto cedula telefono email tipoUsuario'
            }
        ]);

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion de la Vehiculo
        const encontrarVehiculo = await Vehiculo.findOne({ placa: req.body.placa });
        if(encontrarVehiculo){ return res.status(400).json({ msj: "La Vehiculo ya existe" }) }

        let vehiculo = new Vehiculo();
        
        vehiculo.placa = req.body.placa;
        vehiculo.tipo = req.body.tipo;
        vehiculo.usuario = req.body.usuario;

        vehiculo =  await vehiculo.save();

        res.status(200).send(vehiculo);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let VehiculoEncontrada = await Vehiculo.findById({ _id : id });
        if(!VehiculoEncontrada) { return res.status(404).json({mjs: "Vehiculo no encontrada"}) }

        const {  placa, tipo, usuario } = req.body;

        let VehiculoExiste = await Vehiculo.findOne({ placa : placa, _id: { $ne : id } });
        if(VehiculoExiste) { return res.status(404).json({mjs: "La Vehiculo ya existe"}) }

        VehiculoEncontrada.placa = placa;
        VehiculoEncontrada.tipo = tipo;
        VehiculoEncontrada.usuario = usuario;
        
        VehiculoEncontrada = await VehiculoEncontrada.save();

        res.status(202).send(VehiculoEncontrada);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update
}