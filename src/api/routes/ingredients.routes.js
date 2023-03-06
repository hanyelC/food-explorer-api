import { Router } from 'express'
import multer from 'multer'
import { IngredientsController } from '../controllers/IngredientsController.js'
import { Auth } from '../middlewares/auth.js'
import { MULTER as multer_configs } from '../../config/upload.js'

const upload = multer(multer_configs)

export const ingredientsRouter = Router()
const ingredientsController = new IngredientsController()

ingredientsRouter.post(
  '/',
  upload.single('image'),
  ingredientsController.create
)
