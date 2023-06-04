/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
