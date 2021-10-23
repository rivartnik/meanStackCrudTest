const mongoose = require('mongoose');

const File = mongoose.Schema({
  name: {type: String, required: true},
  last_modified: {type: String, required: true},
  bucket: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Bucket"},
  size: {type: Number, required: true},
  file_path:{type:String, required:true}
})
module.exports = mongoose.model('File', File, 'files');
