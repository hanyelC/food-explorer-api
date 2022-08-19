const { Router } = require('express')
const multer = require('multer')

const { MULTER: multer_configs } = require('../../config/upload')
const { ImagesController } = require('../controllers/ImagesController')
const { Auth } = require('../middlewares/auth')

const imagesRouter = Router()
const imagesController = new ImagesController()
const auth = new Auth()

const upload = multer(multer_configs)

imagesRouter.use(auth.ensureLogged)

imagesRouter.patch('/', upload.single('image'), imagesController.create)

module.exports = { imagesRouter }
