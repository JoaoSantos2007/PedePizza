import mongoose from 'mongoose';
import { ACCESSTOKEN_LIFETIME } from '../utils/env.js';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const blocklistModel = new Schema({
  key: String,
  expiresIn: {
    type: Date,
    default: Date.now,
    expires: ACCESSTOKEN_LIFETIME * 60, // Convert Minutes to second
  },
});

const Blocklist = db.model('blocklist', blocklistModel);

export default Blocklist;
