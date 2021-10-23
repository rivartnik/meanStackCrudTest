const mongoose = require('mongoose');

const Bucket = mongoose.Schema({
  name: {type: String, required: true},
  location:{type: mongoose.Schema.Types.ObjectId, required: true, ref:"Location"}
})
module.exports = mongoose.model('Bucket', Bucket, 'buckets');
