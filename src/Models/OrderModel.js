import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const orderSchema = new Schema({
  id: String,
  userID: String,
  products: Object,
  price: Number,
});

const Order = db.model('order', orderSchema);

export default Order;
