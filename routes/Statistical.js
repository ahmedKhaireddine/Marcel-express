const express = require('express');
const route = express.Router();
const StatisticalController = require('../controllers').Statistical;

route.post('/add', StatisticalController.add);
route.get('/all', StatisticalController.getAll);
route.get('/all/idUser/:id', StatisticalController.getStatisticalByIdUser);

module.exports = route;