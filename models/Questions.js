const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
  id:{
    type: Number,
    required: true
  },
  question: {
    type: String,
    required : true
  },
  createdDate:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Question', Question);