const express = require('express');
const CONTROLLERS = require('./CONTROLLERS.js');
const router = express.Router();

router.post('/usuarios', CONTROLLERS.cadastrarUsuario);
router.get('/usuarios', CONTROLLERS.buscarUsuarios);

module.exports = router;