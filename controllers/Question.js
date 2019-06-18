const QuestionModel = require('../models').Question;

const add = (req, res) => {
  console.log('@controller Game add', req.body);
  QuestionModel.countDocuments().exec((err, count)=>{
    const newQuestion = new QuestionModel({
      id: count + 1,
      question: req.body.question
    });
    newQuestion.save()
    .then((Question)=>{
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
  QuestionModel.find((err, questions)=>{
    if(err){
      console.log('@themecontroller getAll err', err);
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      questions: questions 
    });
  });
};


module.exports = {
  add,
  getAll
}
