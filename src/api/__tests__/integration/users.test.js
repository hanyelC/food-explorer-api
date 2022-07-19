require('dotenv').config()

const baseUrl = process.env.LOCAL_URL
const port = process.env.PORT

describe('Users E2E', () => {
  let user

  beforeEach(() => {
    user = {
      name: "Hanyel",
      email: "foo@email.com",
      password: "123456",
      passwordConfirm: "123456"
    }
  })

  test('POST /users - should return 201 and id', async () => {
    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data).toHaveProperty('id')
  })

  test('POST /users - should return 400 and message', async () => {
    delete user.passwordConfirm

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Confirmação da senha é obrigatória.')
  })

  test('POST /users - should return 400 and message', async () => {
    delete user.password

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Senha é obrigatória.')
  })

  test('POST /users - should return 400 and message', async () => {
    delete user.name

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Nome é obrigatório.')
  })

  test('POST /users - should return 400 and message', async () => {
    delete user.email

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Email é obrigatório.')
  })

  test('POST /users - should return 400 and message', async () => {
    user.email = 'foo'

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Formato de email inválido, formato exemplo: fulano@gmail.com')
  })

  test('POST /users - should return 400 and message', async () => {
    user.password = 123

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Senha inválida, a senha deve ser uma string.')
  })

  test('POST /users - should return 400 and message', async () => {
    user.password = []

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Senha inválida, a senha deve ser uma string.')
  })

  test('POST /users - should return 400 and message', async () => {
    user.password = {}

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Senha inválida, a senha deve ser uma string.')
  })

  test('POST /users - should return 400 and message', async () => {
    user.password = "123"

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('A senha precisa ter no mínimo 6 caracteres.')
  })

  test('POST /users - should return 400 and message', async () => {
    user.password = "123abc"

    const res = await fetch(`${baseUrl}:${port}/users`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data).toHaveProperty('message')
    expect(data.message).toStrictEqual('Senhas não conferem.')
  })
})
