const { env } = require('../../config/vars')
const { PrismaClient } = require('@prisma/client')

/**
 * @type { PrismaClient }
 */
let prisma

if (env === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

module.exports = { prisma }
