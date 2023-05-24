var express = require('express');
var router = express.Router();
var controller = require('../controllers/comentario.controller');

/* GET users listing. */
router.get('/pelicula/:peliculaId/listar', function(req, res) {
    controller.show(req, res);
});

router.post('/pelicula/:peliculaId/create', function(req, res) {
    controller.create(req, res);
});

router.post('/pelicula/:peliculaId/update/:id', function(req, res) {
    controller.update(req, res);
});

module.exports = router;
