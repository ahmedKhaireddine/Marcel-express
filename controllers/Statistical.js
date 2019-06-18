
const StatisticalModel = require('../models').Statistical;

const add = (req, res) => {
  console.log('@controller statistical add', req.body);
  StatisticalModel.countDocuments().exec((err, count)=>{
    const newStatistical = new StatisticalModel({
      id: count + 1,
      user: req.body.user,
      game: req.body.game,
      Time: req.body.time,
      createdDate: req.body.date
    });
    newStatistical.save()
    .then((statistical)=>{
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
};

const getAll = (req, res) => {
  StatisticalModel.find((err, statisticals)=>{
    if(err){
      console.log('@themecontroller getAll err', err);
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      statisticals: statisticals
    });
  });
};

const getStatisticalByIdUser = (req, res) =>{
  const _idUser = req.params.id;
  console.log("@themecontroller getone: id", _idUser);
  StatisticalModel.find().where({ 'user' : _idUser }).exec((err , statisticals)=>{
    if(err){
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      statisticals: statisticals
    });
  });
}

module.exports ={
  add,
  getAll,
  getStatisticalByIdUser
}