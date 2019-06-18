
const GameModel = require('../models').Game; 

const add = (req, res) => {
  console.log('@controller Game add', req.body);
  GameModel.countDocuments().exec((err, count)=>{
    const newGame = new GameModel({
      id: count + 1,
      name: req.body.name,
      link:req.body.link,
      instructions: req.body.instructions,
      steps:req.body.steps,
      theme: req.body.theme
    });
    newGame.save()
    .then((Game)=>{
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

const getAllByTheme = (req, res) => {
  const idTheme = req.params.id;
  console.log('@Gamecontroller getAllByTheme idTheme', idTheme);
  GameModel.find().where({ 'theme' : idTheme }).exec((err, Games)=>{
    if(err){
      console.log('@themecontroller getAll err', err);
      return res.json({
        success: false,
        error: err.message
      });
    }
    console.log('@Game GAMES', Games);
    res.json({
      success: true,
      Games: Games
    });
  });
}

const getOne = (req, res) => {
  const idGame = req.params.id;
  console.log("@Gamecontroller getone: id", idGame);
  GameModel.findOne().where({ 'id' : idGame }).exec((err , Game)=>{
    if(err){
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      Game: Game
    });
  });
}

const updateGame = (req, res)=>{
  
};

const removeGame = (req, res) => {
  const _idGame = req.params.id;
  console.log("@Gamecontroller removeGame: id", _idGame);
  GameModel.deleteOne().where({ '_id': _idGame }).exec((err , result)=>{
    if(err){
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      isDeleted: true,
      result: result
    });
  });

}

module.exports = {
  add,
  getAllByTheme,
  getOne,
  removeGame,
  updateGame
}