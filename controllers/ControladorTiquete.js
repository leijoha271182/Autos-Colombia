const Tiquete = require('../models/Tiquete');

const getAll = async (req, res) =>{
    try {
        
        const response = await Tiquete.find().populate([
            {
                path: 'suscripcion',
                select: 'tipoSuscripcion precio beneficios'
            },
            {
                path: 'vehiculo',
                select: 'placa tipo'
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

        const response = await Tiquete.findById({ _id : id }).populate([
            {
                path: 'suscripcion',
                select: 'tipoSuscripcion precio beneficios'
            },
            {
                path: 'vehiculo',
                select: 'placa tipo'
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

        // Validacion del tiquete
        const encontrarTiquete = await Tiquete.findOne({ codigoFactura: req.body.codigoFactura });
        if(encontrarTiquete){ return res.status(400).json({ msj: "El tiquete ya existe" }) }

        let tiquete = new Tiquete();
        
        tiquete.codigoFactura = req.body.codigoFactura;
        tiquete.horaEntrada = req.body.horaEntrada;
        tiquete.suscripcion = req.body.suscripcion;
        tiquete.vehiculo = req.body.vehiculo;
        tiquete.celda = req.body.celda;

        tiquete =  await tiquete.save();

        res.status(200).send(tiquete);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let tiqueteEncontrado = await Tiquete.findById({ _id : id });
        if(!tiqueteEncontrado) { return res.status(404).json({mjs: "Tiquete no encontrado"}) }

        const {  codigoFactura, horaEntrada, suscripcion, vehiculo, celda } = req.body; //revisar suscripcion

        let tiqueteExiste = await Tiquete.findOne({ codigoFactura : codigoFactura, _id: { $ne : id } });
        if(tiqueteExiste) { return res.status(404).json({mjs: "El tiquete ya existe"}) }

        tiqueteEncontrado.codigoFactura = codigoFactura;
        tiqueteEncontrado.horaEntrada = horaEntrada;
        tiqueteEncontrado.suscripcion = suscripcion;
        tiqueteEncontrado.vehiculo = vehiculo;
        tiqueteEncontrado.celda = celda;

        tiqueteEncontrado = await tiqueteEncontrado.save();

        res.status(202).send(tiqueteEncontrado);

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