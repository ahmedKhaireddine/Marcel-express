const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Theme = new Schema({
  id:{
    type: Number,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  createdDate:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Theme', Theme);