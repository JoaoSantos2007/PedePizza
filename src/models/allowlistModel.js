import mongoose from 'mongoose';
import { REFRESHTOKEN_LIFETIME } from '../utils/env.js';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const AllowlistModel = new Schema({
  key: String,
  value: String,
  expiresIn: {
    type: Date,
    default: Date.now,
    expires: REFRESHTOKEN_LIFETIME * 86400, // Convert days to seconds
  },
});

const Allowlist = db.model('allowlist', AllowlistModel);

export default Allowlist;
