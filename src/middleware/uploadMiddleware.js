import multer from 'multer'
import randomID from '../scripts/randomID.js'

const upload = multer({
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

export {upload}