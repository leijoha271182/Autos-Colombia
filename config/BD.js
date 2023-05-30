const mongoose = require('mongoose')

const getConnection = async () => {
    try {
        const url = 'mongodb+srv://'+process.env.USER+':'+process.env.PASSWORD+'@cluster0.xlf3oau.mongodb.net/';

        await mongoose.connect(url);

        console.log("Conexion Exitosa");

    } catch (error) {
        console.log(error);
    }
}


module.exports = { getConnection }