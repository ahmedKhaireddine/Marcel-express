const express = require('express');
const route = express.Router();
const UserController = require('../controllers').User;

route.post('/signup', UserController.Singup);
route.post('/login', UserController.Login);
route.get('/id/:id', UserController.getUserById);

module.exports = route;

