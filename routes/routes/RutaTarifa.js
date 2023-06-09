const router = require('express').Router();

const ControladorTarifa = require('../../controllers/ControladorTarifa');

router.route('/tarifa')
    .get(ControladorTarifa.getAll)
    .post(ControladorTarifa.create);

router.route('/tarifa/:id')
    .get(ControladorTarifa.getById)
    .put(ControladorTarifa.update)
    .patch(ControladorTarifa.update);

module.exports = router;