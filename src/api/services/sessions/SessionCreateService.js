const { sign } = require('jsonwebtoken')
const { compareSync } = require('bcryptjs')
const { jwtSecret, jwtExpirationInterval } = require('../../../config/vars')
const { AppError } = require('../../utils/AppError')

class SessionCreateService {
  constructor(usersRepository) {
    this.repository = usersRepository
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError('E-mail e senha são obrigatórios.')
    }

    if (typeof email != 'string' || typeof password != 'string') {
      throw new AppError('E-mail e/ou senha inválida.', 400)
    }

    const user = await this.repository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail e/ou senha inválida.', 401)
    }

    const passwordMatched = compareSync(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha inválida.', 401)
    }

    const subject = JSON.stringify({
      user_id: user.id,
      isAdmin: user.admin
    })

    const token = sign({}, jwtSecret, {
      subject,
      expiresIn: jwtExpirationInterval + 'm'
    })

    delete user.password

    return { user, token }

  }
}

module.exports = { SessionCreateService }
