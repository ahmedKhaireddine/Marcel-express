const express = require('express');
const route = express.Router();
const QuestionControlleur = require('../controllers').Question;

route.post('/add', QuestionControlleur.add);
route.get('/all', QuestionControlleur.getAll);

module.exports = route;