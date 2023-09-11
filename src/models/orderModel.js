import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const orderSchema = new Schema({
  items: [],
}, {
  timestamps: true,
});

const orderModel = db.model('orders', orderSchema);

export default orderModel;
