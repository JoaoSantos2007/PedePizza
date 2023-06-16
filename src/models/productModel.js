import mongoose from 'mongoose';
import db from '../config/mongo.js';

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
    enum: ['pizza', 'drink'],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
});

const Product = db.model('products', productSchema);

export default Product;
