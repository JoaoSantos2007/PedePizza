import mongoose from 'mongoose';
import dotenv from 'dotenv';
import db from '../Config/mongodb.js';

dotenv.config();

const { Schema } = mongoose;
const refreshTokenLifetime = process.env.REFRESHTOKEN_LIFETIME;

const AllowlistModel = new Schema({
  key: String,
  value: String,
  expiresIn: {
    type: Date,
    default: Date.now,
    expires: refreshTokenLifetime * 86400, // Convert days to seconds
  },
});

const Allowlist = db.model('allowlist', AllowlistModel);

export default Allowlist;
