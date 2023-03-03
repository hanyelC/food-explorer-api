import { Router } from 'express'
import { ProductsController } from '../controllers/ProductsController.js'
import { CategoriesController } from '../controllers/CategoriesController.js'
import { Auth } from '../middlewares/auth.js'
import multer from 'multer'
import { MULTER as multer_configs } from '../../config/upload.js'

const upload = multer(multer_configs)

export const productsRouter = Router()
const productsController = new ProductsController()
const categoriesController = new CategoriesController()

const auth = new Auth()

productsRouter.use(auth.ensureLogged)

productsRouter.get('/', productsController.index)
productsRouter.get('/:product_id', productsController.show)

productsRouter.use(auth.ensureAdmin)

productsRouter.post('/', upload.single('image'), productsController.create)
productsRouter.put('/', productsController.update)
productsRouter.delete('/:product_id', productsController.delete)
productsRouter.post('/category', categoriesController.addProduct)
