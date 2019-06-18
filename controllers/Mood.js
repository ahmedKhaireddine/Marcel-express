const MoodModel = require('../models').Mood;

const add = (req, res) => {
  console.log('@controller Game add', req.body);
  MoodModel.countDocuments().exec((err, count)=>{
    const newMood = new MoodModel({
      id: count + 1,
      mood: req.body.mood,
      answer1:"",
      answer2:"",
      answer3:"",
      diary:"",
      user: req.body.user,
      date: req.body.date
    });
    newMood.save()
    .then((Mood)=>{
      res.json({
        success:true,
        message:"register successfully"
      });
    })
    .catch((err)=>{
      res.json({
        success: false,
        message: err.message
      });
    })
  });
}

const getAll = (req, res) => {
  MoodModel.find((err, Moods)=>{
    if(err){
      console.log('@themecontroller getAll err', err);
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      Moods: Moods 
    });
  });
};

const getOneByDate = (req, res) => {
  const date = req.params.date;
  const userId = req.params.id;
  console.log('getOneByDate date', date);
  MoodModel.findOne().where({ "date" : date, "user" : userId }).exec((err, Moods)=>{
    if(err){
      console.log('@themecontroller getAll err', err);
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      Moods: Moods
    });
  });
 };

const updateMoodByDate = (req, res) => {
  const idUser = req.params.id;
  const date = req.params.date;
  // console.log('@ updateMoodByDate idUser:',idUser);
  // console.log('@ updateMoodByDate date', date);
  // console.log('@ updateMoodByDate req.body', req.body);
  MoodModel.updateOne({ "user" : idUser,  "date" : date}, {
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    diary: req.body.diary
  }).exec((err, mood) => {
    if (err !== null) {

      
      console.log('something went wrong err', err);
    } else {
      console.log('Student has been updated', mood);
    }
  });
};

module.exports = {
  add,
  getAll,
  updateMoodByDate,
  getOneByDate
}