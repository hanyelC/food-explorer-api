import { UserRepository } from '../repositories/users/UserRepository.js'
import { SessionCreateService } from '../services/sessions/SessionCreateService.js'

export class SessionController {
  async create(req, res) {
    const { email, password } = req.body

    const userRepository = new UserRepository()
    const sessionCreateService = new SessionCreateService(userRepository)

    const { user, token } = await sessionCreateService.execute({ email, password })

    return res.json({ user, token })
  }
}
