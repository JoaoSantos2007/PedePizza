import mongoose from 'mongoose';
import db from '../Config/mongodb.js';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 30,
    min: 3,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
    unique: true,
  },
});

const Product = db.model('Products', productSchema);

export default Product;
