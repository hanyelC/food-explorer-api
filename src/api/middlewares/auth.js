const { verify } = require('jsonwebtoken')

const { AppError } = require('../utils/AppError')
const { jwtSecret } = require('../../config/vars')

class Auth {
  async ensureLogged(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new AppError('Token não informado.', 401)
    }

    const [, token] = authHeader.split(' ')


    try {
      const { sub } = verify(token, jwtSecret)
      const { user_id } = JSON.parse(sub)

      req.user.user_id = user_id

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

    try {
      const { sub } = verify(token, jwtSecret)
      const { user_id, isAdmin } = JSON.parse(sub)

      if (!isAdmin) {
        throw new AppError('Access denied.', 403)
      }

      req.user.user_id = user_id

      return next()
    } catch {
      throw new AppError('Token inválido.', 401)
    }

  }
}

module.exports = { Auth }
