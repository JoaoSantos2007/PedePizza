import express from 'express';
import './config/mongo.js';
import bodyParser from 'body-parser';
import Routes from './routes/index.js';
import { deleteOldFiles } from './utils/uploadUtils.js';

const app = express();

app.use('/', express.static('public/'));
app.use('/uploads', express.static('uploads/'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

Routes(app);
deleteOldFiles();

export default app;
