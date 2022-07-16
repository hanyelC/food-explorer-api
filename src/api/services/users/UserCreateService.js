const { hashSync } = require('bcryptjs')
const { AppError } = require('../../utils/AppError')

class UserCreateService {
  constructor(repository) {
    this.repository = repository
  }

  async execute({ name, email, password, passwordConfirm }) {
    if (!name)
      throw new AppError('Nome é obrigatório.')

    if (!email)
      throw new AppError('Email é obrigatório.')

    if (!password)
      throw new AppError('Senha é obrigatória.')

    if (!passwordConfirm)
      throw new AppError('Confirmação da senha é obrigatória.')

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      throw new AppError('Formato de email inválido, formato exemplo: fulano@gmail.com')

    if (password.length < 6)
      throw new AppError('A senha precisa ter no mínimo 6 caracteres.')

    if (password != passwordConfirm)
      throw new AppError('Senhas não conferem.')

    const userWithEmail = await this.repository.findByEmail(email)

    if (userWithEmail)
      throw new AppError('Email já cadastrado.')

    const hashedPassword = hashSync(password)

    const userCreated = await this.repository.create({ name, email, password: hashedPassword })

    return { id: userCreated.id }

  }
}

module.exports = { UserCreateService }
