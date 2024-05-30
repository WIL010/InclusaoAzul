const express = require('express')
const router = express.Router()
const CONTROLLERS = require('./CONTROLLERS')

router.post('/usuario', CONTROLLERS.inserir);

module.exports = router
