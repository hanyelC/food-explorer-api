import { Router } from 'express'
import { UsersController } from '../controllers/UsersController.js'

export const userRouter = Router()
const usersController = new UsersController()

userRouter.post('/', usersController.create)
