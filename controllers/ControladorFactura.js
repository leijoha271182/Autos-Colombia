const Factura = require('../models/Factura');

const getAll = async (req, res) =>{
    try {
        
        const response = await Factura.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Factura.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion de la Factura
        const encontrarFactura = await Factura.findOne({ codigoFactura: req.body.codigoFactura });
        if(encontrarFactura){ return res.status(400).json({ msj: "La Factura ya existe" }) }

        let factura = new Factura();
        
        factura.codigoFactura = req.body.codigoFactura;
        factura.placa = req.body.placa;
        factura.horaSalida = new Date();

        factura =  await factura.save();

        res.status(200).send(factura);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let FacturaEncontrada = await Factura.findById({ _id : id });
        if(!FacturaEncontrada) { return res.status(404).json({mjs: "Factura no encontrada"}) }

        const {  codigoFactura, horaSalida, placa } = req.body;

        let FacturaExiste = await Factura.findOne({ codigoFactura : codigoFactura, _id: { $ne : id } });
        if(FacturaExiste) { return res.status(404).json({mjs: "La Factura ya existe"}) }

        FacturaEncontrada.codigoFactura = codigoFactura;
        FacturaEncontrada.horaSalida = horaSalida;
        FacturaEncontrada.placa = placa;
        
        FacturaEncontrada = await FacturaEncontrada.save();

        res.status(202).send(FacturaEncontrada);

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