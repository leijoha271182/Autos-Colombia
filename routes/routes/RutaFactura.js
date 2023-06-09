const router = require('express').Router();

const ControladorFactura = require('../../controllers/ControladorFactura');

router.route('/factura')
    .get(ControladorFactura.getAll)
    .post(ControladorFactura.create);

router.route('/factura/:id')
    .get(ControladorFactura.getById)
    .put(ControladorFactura.update)
    .patch(ControladorFactura.update);

module.exports = router;