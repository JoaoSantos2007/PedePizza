import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
  },
  cart: {
    type: Object,
  },
});

const User = db.model('users', userSchema);

export default User;
