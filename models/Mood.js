const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mood = new Schema({
  id:{
    type: Number,
    required: true
  },
  mood: {
    type: String,
    required : true
  },
  answer1: {
    type: String
  },
  answer2: {
    type: String
  },
  answer3: {
    type: String
  },
  diary:{
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date:{
    type: String
  },
  createdDate:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Mood', Mood);

