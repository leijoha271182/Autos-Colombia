const Tarifa = require('../models/Tarifas');

const getAll = async (req, res) =>{
    try {
        
        const response = await Tarifa.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Tarifa.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion de la Tarifa
        const encontrarTarifa = await Tarifa.findOne({ tipoVehiculo: req.body.tipoVehiculo });
        if(encontrarTarifa){ return res.status(400).json({ msj: "La Tarifa ya existe" }) }

        let tarifa = new Tarifa();
        
        tarifa.tipoVehiculo = req.body.tipoVehiculo;
        tarifa.precio = req.body.precio;

        tarifa =  await tarifa.save();

        res.status(200).send(tarifa);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let TarifaEncontrada = await Tarifa.findById({ _id : id });
        if(!TarifaEncontrada) { return res.status(404).json({mjs: "Tarifa no encontrada"}) }

        const {  tipoVehiculo, precio } = req.body;

        let TarifaExiste = await Tarifa.findOne({ tipoVehiculo : tipoVehiculo, _id: { $ne : id } });
        if(TarifaExiste) { return res.status(404).json({mjs: "La Tarifa ya existe"}) }

        TarifaEncontrada.tipoVehiculo = tipoVehiculo;
        TarifaEncontrada.precio = precio;
        
        TarifaEncontrada = await TarifaEncontrada.save();

        res.status(202).send(TarifaEncontrada);

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