const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
  id:{
    type: Number,
    required: true,
    index: true
  },
  name:{
    type: String,
    required: true
  },
  link:{
    type: String,
    required: true
  },
  instructions:{
    type: String,
    required: true,
  },
  steps:{
    type: Array,
    required: true
  },
  createdDate:{
    type: Date,
    default: Date.now
  },
  theme:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme"
  }
});

module.exports = mongoose.model('Game', Game);

