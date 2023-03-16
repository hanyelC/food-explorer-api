import { env } from '../../config/vars.js'
import { PrismaClient } from '@prisma/client'

/**
 * @type { PrismaClient }
 */
export let prisma

if (env === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: env === 'development' ? ['query'] : undefined
    })
  }

  prisma = global.prisma
}
