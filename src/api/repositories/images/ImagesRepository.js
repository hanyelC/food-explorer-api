const { randomUUID } = require('crypto')

const { prisma } = require('../../lib/prisma')

class ImagesRepository {
  async findById(uuid) {

  }

  async create({ id, image_buffer, image_type, image_name }) {
    const image = await prisma.image.create({
      data: {
        id,
        imageData: image_buffer,
        imageName: image_name,
        imageType: image_type
      }
    })

    return image
  }

  async delete(uuid) {

  }
}

module.exports = { ImagesRepository }
