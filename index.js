const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 
const methodOverride = require('method-override');
const { getConnection } = require('./config/BD')

//Rutas
const tiquete = require('./routes/routes/RutaTiquete');
const vehiculo = require('./routes/routes/RutaVehiculo');
const suscripcion = require('./routes/routes/RutaSuscripcion');
const usuario = require('./routes/routes/RutaUsuario');
const tarifa = require('./routes/routes/RutaTarifa');
const factura = require('./routes/routes/RutaFactura');


//Conexion a BD
const BD = require('./config/BD');
const Tiquete = require('./models/Tiquete');
const Vehiculo = require('./models/Vehiculo');
const Suscripcion = require('./models/Suscripcion');
const Usuario = require('./models/Usuario');
const Tarifa = require('./models/Tarifas');
const Factura = require('./models/Factura');

//Inicializar importaciones
const app = express();
getConnection();


//Middlewares
app.use(cors());
app.use(express.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended : false }))

//Configuraciones 
app.get('/', function(req, res){
    res.send("Hello World!!")
})


//Usar rutas
app.use('/api', tiquete);
app.use('/api', vehiculo);
app.use('/api', suscripcion);
app.use('/api', usuario);
app.use('/api', tarifa);
app.use('/api', factura);

//Setup 
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log('API REST corriendo en el puerto: ', PORT);
})

