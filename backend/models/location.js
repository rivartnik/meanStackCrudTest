const mongoose = require('mongoose');

const Location = mongoose.Schema({
  name: {type: String, required: true},
})
module.exports = mongoose.model('Location', Location,'locations');
