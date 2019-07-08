const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  description: String,
  profileImg: String, //look into file upload
  reputation: Number,
  role: {
    type: String,
    enum: ['user', 'mod', 'admin']
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: "Comment"
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Review"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
