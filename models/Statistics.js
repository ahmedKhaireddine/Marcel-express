const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistical = new Schema({
  id:{
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  game:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  },
  Time:{
    type: Number,
    required:true, 
  },
  createdDate:{
    type: Date,
    // default: Date.now()
  }
});

module.exports = mongoose.model('Statistical', Statistical);