const express = require('express');
const route = express.Router();
const MoodController = require('../controllers').Mood;

route.post('/add', MoodController.add);
route.get('/getMood/:date/userId/:id', MoodController.getOneByDate);
route.get('/all', MoodController.getAll);
route.put('/update/:date/idUser/:id', MoodController.updateMoodByDate);

module.exports = route;