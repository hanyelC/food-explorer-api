const { Router } = require('express')
const { IngredientsController } = require('../controllers/IngredientsController')
const { Auth } = require('../middlewares/auth')
const multer = require('multer')
const { MULTER: multer_configs } = require('../../config/upload')

const upload = multer(multer_configs)

const ingredientsRouter = Router()
const ingredientsController = new IngredientsController()

ingredientsRouter.post('/', upload.single('image'), ingredientsController.create)

module.exports = { ingredientsRouter }
