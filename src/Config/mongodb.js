import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection estabilished with success!');
  })
  .catch((err) => {
    throw new Error(`Error in database connection: ${err}`);
  });

const db = mongoose.connection.useDb('pedePizza');

export default db;
