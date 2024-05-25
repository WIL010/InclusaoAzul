require('dotenv').config({path:'variaveis.env'})
const express = require('express')
const cors = require('corse')
const bodyParser = require('body-parser')

const routes = require('./ROUTES')