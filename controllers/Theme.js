
const ThemeModel = require('../models').Theme; 

const add = (req, res) => {
  console.log('@controller theme add', req.body);
  ThemeModel.countDocuments().exec((err, count)=>{
    const newTheme = new ThemeModel({
      id: count + 1,
      name: req.body.name,
      description: req.body.description
    });
    newTheme.save()
    .then((theme)=>{
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
  ThemeModel.find((err, themes)=>{
    if(err){
      console.log('@themecontroller getAll err', err);
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      themes: themes
    });
  });
}

const getOne = (req, res) => {
  const nameTheme = req.params.name;
  console.log("@themecontroller getone: id", nameTheme);
  ThemeModel.findOne().where({ 'name' : nameTheme }).exec((err , theme)=>{
    if(err){
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      theme: theme
    });
  });
}

const updateTheme = (req, res)=>{
  
};

const removeTheme = (req, res) => {
  const _idTheme = req.params.id;
  console.log("@themecontroller removetheme: id", _idTheme);
  ThemeModel.deleteOne().where({ '_id': _idTheme }).exec((err , result)=>{
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
  getAll,
  getOne,
  removeTheme,
  updateTheme
}