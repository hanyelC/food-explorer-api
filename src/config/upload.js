import { fileURLToPath } from 'node:url'
import path from 'node:path'
import multer from 'multer'
import { randomUUID } from 'node:crypto'
import { AppError } from '../api/utils/AppError.js'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
export const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads')

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, cb) {
      let error = null
      const [type, subType] = file.mimetype.split('/')

      if (type !== 'image') {
        error = new AppError(
          'Invalid file format, the file must be an image!',
          400
        )
      }

      const prefix = randomUUID()
      const fileName = `${prefix}.${subType}`

      cb(error, fileName)
    },
  }),
}
