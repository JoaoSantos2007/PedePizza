import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'The email field is required!'],
    validate: {
      validator: (value) => {
        const validateEmail = /\S+@\S+\.\S+/;
        return validateEmail.test(value);
      },
      message: (props) => `The email field must be a valid email. ${props.value} is not a valid email!`,
    },
  },
  name: {
    type: String,
    required: [true, 'The name field is required!'],
    validate: {
      validator: (value) => {
        const nameLength = value.length;

        if (nameLength >= 3 && nameLength <= 50) return true;

        return false;
      },
      message: (props) => `The length of the name field must be between 3 and 50 characters. ${props.value.length} characters are not allowed!`,
    },
  },
  hashPassword: {
    type: String,
    required: [true, 'The password field is required!'],
  },
  admin: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Object,
  },
});

const User = db.model('users', userSchema);

export default User;
