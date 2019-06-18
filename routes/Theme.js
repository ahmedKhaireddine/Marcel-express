const express = require('express');
const route = express.Router();
const ThemeController = require('../controllers').Theme;

route.post('/add', ThemeController.add);
route.get('/all', ThemeController.getAll);
route.get('/nameTheme/:name', ThemeController.getOne);
route.put('/update/:id', ThemeController.updateTheme);
route.delete('/delete/:id', ThemeController.removeTheme);

module.exports = route;

