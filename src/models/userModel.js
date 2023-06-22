import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
  },
  cart: {
    type: Object,
    required: true,
  },
});

const User = db.models.users || db.model('users', userSchema);

export default User;
