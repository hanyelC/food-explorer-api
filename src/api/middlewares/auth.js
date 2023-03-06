import { verify } from 'jsonwebtoken'

import { AppError } from '../utils/AppError.js'
import { jwtSecret } from '../../config/vars.js'

export class Auth {
  async ensureLogged(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new AppError('Token não informado.', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
      const { sub } = verify(token, jwtSecret)
      const { user_id } = JSON.parse(sub)

      req.user = { user_id }

      return next()
    } catch {
      throw new AppError('Token inválido.', 401)
    }
  }

  async ensureAdmin(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new AppError('Token não informado.', 401)
    }

    const [, token] = authHeader.split(' ')

    let sub

    try {
      sub = verify(token, jwtSecret).sub
    } catch {
      throw new AppError('Token inválido.', 401)
    }

    const { user_id, isAdmin } = JSON.parse(sub)

    if (!isAdmin) {
      throw new AppError('Access denied.', 403)
    }

    req.user = { user_id }

    return next()
  }
}
