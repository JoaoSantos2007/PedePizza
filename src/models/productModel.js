import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'The name property is required!'],
    trim: true,
    validate: {
      validator: (value) => {
        const valueLength = value.length;

        if (valueLength >= 4 && valueLength <= 30) return true;

        return false;
      },
      message: (props) => `The name field must have between 4 and 30 caracters. ${props.value.length} caracters is not allowed!`,
    },
  },
  type: {
    type: String,
    required: [true, 'The type field is required!'],
    enum: {
      values: ['pizza', 'drink'],
      message: "The type property must be 'pizza' or 'drink'. {VALUE} is not supported!",
    },
  },
  description: {
    type: String,
    required: [true, 'The description field is required!'],
    validate: {
      validator: (value) => {
        const valueLength = value.length;

        if (valueLength >= 10 && valueLength <= 150) return true;

        return false;
      },
      message: (props) => `The description field must have between 10 and 150 caracteres. ${props.value.length} caracters is not allowed!`,
    },
  },
  price: {
    type: Number,
    required: [true, 'The price field is required!'],
    min: [1, 'The price property must be a float number between 1 and 1000. {VALUE} is not allowed!'],
    max: [1000, 'The price property must be a float number between 1 and 1000. {VALUE} is not allowed!'],
  },
  img: {
    type: String,
  },
});

const Product = db.model('products', productSchema);

export default Product;
