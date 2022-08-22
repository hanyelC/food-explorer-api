const path = require('path')
const multer = require('multer')
const { randomUUID } = require('crypto')
const { AppError } = require('../api/utils/AppError')

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads')

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, cb) {
      let error = null
      const [type, subType] = file.mimetype.split('/')

      if (type !== 'image') {
        error = new AppError('Invalid file format, the file must be an image!', 400)
      }

      const prefix = randomUUID()
      const fileName = `${prefix}.${subType}`

      cb(error, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}
