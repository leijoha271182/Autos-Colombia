const Usuario = require('../models/Usuario');

const getAll = async (req, res) =>{
    try {
        
        const response = await Usuario.find();
        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")
    }
}

const getById = async (req, res) =>{
    try {
        
        const { id } = req.params;

        const response = await Usuario.findById({ _id : id })

        res.status(200).send(response);

    } catch (error) {
        console.log(error)
        res.status(404).json({msj: error.message}).send("Internal Error! :(")
    }
}

const create = async (req, res) => {
    try {

        // Validacion del Usuario
        const encontrarUsuario = await Usuario.findOne({  email: req.body.email});
        if(encontrarUsuario){ return res.status(400).json({ msj: "El Usuario ya existe" }) }

        let usuario = new Usuario();
        
        usuario.nombreCompleto = req.body.nombreCompleto;
        usuario.cedula = req.body.cedula;
        usuario.telefono = req.body.telefono;
        usuario.email = req.body.email;
        usuario.tipoUsuario = req.body.tipoUsuario;

        usuario =  await usuario.save();

        res.status(200).send(usuario);

    } catch (error) {
        console.log(error)
        res.status(500).json({msj: error.message}).send("Internal Error! :(")  
    }
}

const update = async(req, res) => {
    try {
        
        const { id } = req.params;
        
        let UsuarioEncontrado = await Usuario.findById({ _id : id });
        if(!UsuarioEncontrado) { return res.status(404).json({mjs: "Usuario no encontrado"}) }

        const {  nombreCompleto, cedula, telefono, email, tipoUsuario } = req.body;

        let UsuarioExiste = await Usuario.findOne({ email: req.body.email, _id: { $ne: UsuarioEncontrado._id } });
        if(UsuarioExiste) { return res.status(404).json({mjs: "El Usuario ya existe"}) }

        UsuarioEncontrado.nombreCompleto = nombreCompleto;
        UsuarioEncontrado.cedula = cedula;
        UsuarioEncontrado.telefono = telefono;
        UsuarioEncontrado.email = email;
        UsuarioEncontrado.tipoUsuario = tipoUsuario;

        UsuarioEncontrado = await UsuarioEncontrado.save();

        res.status(202).send(UsuarioEncontrado);

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