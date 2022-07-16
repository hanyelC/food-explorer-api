class UserRepositoryInMemory {
  constructor(users = []) {
    this.users = users
  }

  findByEmail(email) {
    const user = this.users.find(user => user.email === email)
    return user
  }

  create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1E9),
      name,
      email,
      password
    }

    this.users.push(user)

    return user
  }
}

module.exports = { UserRepositoryInMemory }
