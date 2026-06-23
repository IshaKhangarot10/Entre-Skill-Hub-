const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: 'build'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
