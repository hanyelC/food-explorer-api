import { Router } from 'express'
import multer from 'multer'

import { MULTER as multer_configs } from '../../config/upload.js'
import { ImagesController } from '../controllers/ImagesController.js'
import { Auth } from '../middlewares/auth.js'

export const imagesRouter = Router()
const imagesController = new ImagesController()
const auth = new Auth()

const upload = multer(multer_configs)

imagesRouter.use(auth.ensureLogged)

imagesRouter.get('/:image_name', imagesController.show)

imagesRouter.use(auth.ensureAdmin)

imagesRouter.use(upload.single('image'))

imagesRouter.patch('/', imagesController.create)
