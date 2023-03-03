import { prisma } from '../../lib/prisma.js'

export class ImagesRepository {
  async findById(id) {
    const image = await prisma.image.findUnique({
      where: {
        id
      }
    })

    return image
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

  async delete(id) {
    await prisma.image.delete({
      where: {
        id
      }
    })
  }
}
