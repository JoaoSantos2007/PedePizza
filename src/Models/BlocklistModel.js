import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from '../config/mongo.js';

dotenv.config();

const { Schema } = mongoose;
const accessTokenLifetime = process.env.ACCESSTOKEN_LIFETIME;

const blocklistModel = new Schema({
  key: String,
  expiresIn: {
    type: Date,
    default: Date.now,
    expires: accessTokenLifetime * 60, // Convert Minutes to second
  },
});

const Blocklist = db.model('blocklist', blocklistModel);

export default Blocklist;
