import multer from 'multer';
import path from 'path';
import { UPLOAD_PATH as uploadPath } from '../utils/env.js';

const UploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    filename(req, file, callback) {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);

      const fileName = `${timestamp}${ext}`;
      req.img = fileName;

      return callback(null, fileName);
    },
  }),
});

export default UploadMiddleware;
