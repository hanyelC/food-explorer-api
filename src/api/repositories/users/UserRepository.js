import { prisma } from '../../lib/prisma.js'

export class UserRepository {

  async findByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    return user
  }

  async create({ name, email, password }) {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password
      }
    })

    return newUser
  }
}
