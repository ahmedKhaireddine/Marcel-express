const passport = require('passport');
const uid2 = require('uid2');

const UserModel = require('../models').User;

const Singup = (req,res) => {
  UserModel.countDocuments().exec((err, count) => {
    UserModel.register({
      id: count + 1,
      username: req.body.username,
      token: uid2(16),
      class: req.body.class,
      city: req.body.city,
      bdDate: new Date(req.body.bdDate),
      
    }, req.body.password, (err, user)=>{
      if(err){
        console.error(err);
        res.status(400).json({ error: err.message });
      }
      res.json({ _id: user._id, token: user.token, account: user.account });
    });
  });
}  

const Login = (req, res, next) => {
  console.log('@login entrer');
  passport.authenticate("local", { session: false }, (err, user)=>{
    console.log('@login err', err);
    console.log('@login user', user);
    if (err) {
      return res.json({error: err.message});
    }
    if (!user) {
      return res.json({ error: "Psudo ou mot de passe incorrecte" });
    }
    res.json({
      _id: user._id.toString(),
      token: user.token,
      username: user.username
    });
  })(req, res, next);
}

const getUserById = (req, res) => {
  const _id = req.params.id;
  console.log("@themecontroller getone: id", _id);
  UserModel.findOne().where({ '_id' : _id }).exec((err , user)=>{
    if(err){
      return res.json({
        success: false,
        error: err.message
      });
    }
    res.json({
      success: true,
      user: user
    });
  });
}

module.exports = {
  Singup,
  Login,
  getUserById
}