import { Router } from 'express'
import { CategoriesController } from '../controllers/CategoriesController.js'
import { Auth } from '../middlewares/auth.js'

export const categoriesRouter = Router()
const categoriesController = new CategoriesController()
const auth = new Auth()

categoriesRouter.use(auth.ensureAdmin)
categoriesRouter.post('/', categoriesController.create)
