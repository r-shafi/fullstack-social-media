const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// https://mongoosejs.com/docs/populate.html

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is Required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is Required!'],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    immutable: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is Required!'],
    minlength: [6, 'Password must be at least 6 characters!'],
    select: false,
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: [140, 'Bio must be less than 140 characters!'],
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
