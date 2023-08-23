import mongoose from 'mongoose';
import { DATABASE_NAME, MONGO_URL } from '../utils/env.js';

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connection estabilished with success!');
  })
  .catch((err) => {
    throw new Error(`Error in database connection: ${err}`);
  });

const db = mongoose.connection.useDb(DATABASE_NAME);

export default db;
