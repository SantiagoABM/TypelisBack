var express = require('express');
var router = express.Router();
import {
    
  } from "../controllers/comentario.controller.js";

/* GET users listing. */
router.get('/pelicula/:peliculaId/listar', function(req, res) {
    controller.show(req, res);
});

router.post('/create', function(req, res) {
    controller.create(req, res);
});

router.post('/update/:id', function(req, res) {
    controller.update(req, res);
});

module.exports = router;
