import { AppError } from '../utils/AppError.js'

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  console.log(err)

  return res.status(500).json({ message: 'Internal server error' })
}
