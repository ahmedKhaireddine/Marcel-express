const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const User =  new Schema({
  id:{
    type: Number,
    required: true
  },
  username:{
    type: String,
    required: true,
    index: true
  },
  password:{
    type: String
  },
  token:{
    type: String,
    required: true,
    index: true
  },
  class:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  bdDate:{
    type: Date,
    required: true
  },
  createdDate:{
    type: Date,
    default: Date.now
  }
});

User.plugin(passportLocalMongoose, {
  usernameField: "username", // usernameField is actually an email
  session: false // API doesn't use sessions
});

// Cette méthode sera utilisée par la strategie `passport-local` pour trouver un utilisateur en fonction de son `username` et `password`
User.statics.authenticateLocal = function() {
  let _self = this;
  return function(req, username, password, cb) {
    _self.findByUsername(username, true, function(err, user) {
      if (err) return cb(err);
      if (user) {
        return user.authenticate(password, cb);
      } else {
        return cb(null, false);
      }
    });
  };
};

// Find an user by its token
User.statics.authenticateBearer = function() {
  let _self = this;
  return function(token, cb) {
    if (!token) {
      cb(null, false);
    } else {
      _self.findOne({ token: token }, function(err, user) {
        if (err) return cb(err);
        if (!user) return cb(null, false);
        return cb(null, user);
      });
    }
  };
};

module.exports = mongoose.model('User', User);