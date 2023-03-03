import * as jsonwebtoken from 'jsonwebtoken'
import { default as bcryptjs } from 'bcryptjs'
import { jwtSecret, jwtExpirationInterval } from '../../../config/vars.js'
import { AppError } from '../../utils/AppError.js'

const { compareSync } = bcryptjs
const { sign } = jsonwebtoken

export class SessionCreateService {
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
