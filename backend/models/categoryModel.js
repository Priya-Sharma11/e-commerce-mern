const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  mainCategory:{
    type:String,
    required:true,
  },
  subCategory:{
    type:String,
    required:true,
  }
})
categorySchema.index({mainCategory:1,subCategory:1},{unique:true});

module.exports = mongoose.model('Category',categorySchema);