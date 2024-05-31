const express = require('express');
const CONTROLLERS = require('./CONTROLLERS.js');
const router = express.Router();

router.post('/api/inserir', CONTROLLERS.cadastrarUsuario);

module.exports = router;