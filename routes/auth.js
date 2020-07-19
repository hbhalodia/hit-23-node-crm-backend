var bodyParser = require('body-parser')
const express = require('express')
const authRoute = express.Router()

const userController = require('../controllers/auth')

var jsonParser = bodyParser.json()

authRoute.post('/signup', jsonParser, userController.singUpUser)

authRoute.post('/login', jsonParser, userController.loginUser)
module.exports = authRoute
