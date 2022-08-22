const { prisma } = require('../../lib/prisma')

class ImagesRepository {
  async findById(uuid) {

  }

  async create({ id, image_buffer, image_type, image_name }) {
    const image = await prisma.image.create({
      data: {
        id,
        image_data: image_buffer,
        image_name: image_name,
        image_type: image_type
      }
    })

    return image
  }

  async delete(uuid) {

  }
}

module.exports = { ImagesRepository }
