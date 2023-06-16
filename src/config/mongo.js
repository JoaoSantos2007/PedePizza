import mongoose from 'mongoose';
import { MONGO_URL } from '../utils/env.js';

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection estabilished with success!');
  })
  .catch((err) => {
    throw new Error(`Error in database connection: ${err}`);
  });

const db = mongoose.connection.useDb('pedePizza');

export default db;
