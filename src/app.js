import express from 'express';
import './config/mongo.js';
import Routes from './routes/index.js';
import { deleteOldFiles } from './utils/uploadUtils.js';
import ErrorMiddleware from './middlewares/errorMiddleware.js';
import NotFoundMiddleware from './middlewares/notFoundMiddleware.js';

const app = express();

app.use('/', express.static('public/'));
app.use('/uploads', express.static('uploads/'));

Routes(app);

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

deleteOldFiles();

export default app;
