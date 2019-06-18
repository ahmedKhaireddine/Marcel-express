const express = require('express');
const route = express.Router();
const GameController = require('../controllers').Game;
const GameModel = require('../models').Game;

route.post('/add', GameController.add);
route.get('/allByTheme/:id', GameController.getAllByTheme);
route.get('/id/:id', GameController.getOne);
route.put('/update/:id', GameController.updateGame);
route.delete('/delete/:id', GameController.removeGame);

module.exports = route;