const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  content: {
    type: String,
    required: true,
  },
  is_fav: {
    type: Boolean,
    default: false,
  },
  sender: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('message', MessageSchema);
