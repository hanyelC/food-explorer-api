const { UserCreateService } = require('../UserCreateService')
const { UserRepositoryInMemory } = require('../../../repositories/UserRepositoryInMemory')
const { AppError } = require('../../../utils/AppError')

describe('UserCreateService', () => {
  let userCreateService
  let userRepositoryInMemory
  let user

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)

    user = {
      name: 'Foo name',
      email: 'test@email.com',
      password: 'secret',
      passwordConfirm: 'secret'
    }
  })

  it('user should be created with valid data', async () => {
    const createdUser = await userCreateService.execute(user)

    expect(createdUser).toHaveProperty('id')
  })

  it('user should not be created without name', async () => {
    delete user.name

    await expect(userCreateService.execute(user))
      .rejects.toEqual(new AppError('Nome é obrigatório.'))

  })

  it('user should not be created without email', async () => {
    delete user.email

    await expect(userCreateService.execute(user))
      .rejects
      .toEqual(new AppError('Email é obrigatório.'))

  })

  it('user should not be created without password', async () => {
    delete user.password

    await expect(userCreateService.execute(user))
      .rejects
      .toEqual(new AppError('Senha é obrigatória.'))

  })

  it('user should not be created without password confirmation', async () => {
    delete user.passwordConfirm

    await expect(userCreateService.execute(user))
      .rejects
      .toEqual(new AppError('Confirmação da senha é obrigatória.'))

  })

  it('user should not be created if password && confirmation didn\'t match', async () => {
    user.passwordConfirm = 'another'

    await expect(userCreateService.execute(user))
      .rejects
      .toEqual(new AppError('Senhas não conferem.'))
  })

  it('user should not be created with invalid email', async () => {
    user.email = 'foo baz'

    await expect(userCreateService.execute(user))
      .rejects
      .toEqual(new AppError('Formato de email inválido, formato exemplo: fulano@gmail.com'))

  })

  it('user should not be created with invalid password', async () => {
    user.password = 'foo'

    await expect(userCreateService.execute(user))
      .rejects
      .toEqual(new AppError('A senha precisa ter no mínimo 6 caracteres.'))
  })

  it('user should not be created with email that already exists', async () => {
    await userCreateService.execute(user)

    await expect(userCreateService.execute(user))
      .rejects
      .toEqual(new AppError('Email já cadastrado.'))

  })
})
