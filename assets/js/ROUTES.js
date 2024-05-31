const express = require('express');
const CONTROLLERS = require('./CONTROLLERS.js');
const router = express.Router();

router.post('http://127.0.0.1:5500/api/inserir', CONTROLLERS.cadastrarUsuario);

module.exports = router;