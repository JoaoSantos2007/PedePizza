import multer from 'multer'
import randomID from '../Model/randomID.js'

const uploadMiddleware = multer({
    storage: multer.diskStorage({
      destination: "uploads/",
      filename(req, file, callback) {
        
        const imgID = randomID()
        const fileName = `${imgID}`

        req.body.img = `/uploads/${imgID}`
  
        return callback(null, fileName)
      },
    }),
  })

export default uploadMiddleware