import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const orderSchema = new Schema({
  name: {
    type: String,
  },
});

const orderModel = db.model('orders', orderSchema);

export default orderModel;
