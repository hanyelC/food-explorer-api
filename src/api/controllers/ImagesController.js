const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')

const { ImagesRepository } = require('../repositories/images/ImagesRepository')

const { TMP_FOLDER, UPLOADS_FOLDER } = require('../../config/upload')
const { DiskStorage } = require('../../providers/DiskStorage')

class ImagesController {
  async create(req, res) {
    const { filename, mimetype } = req.file

    const buffer = await fs.promises.readFile(path.resolve(TMP_FOLDER, filename))

    const repository = new ImagesRepository()
    const data = await repository.create({
      id: randomUUID(),
      image_buffer: buffer,
      image_name: filename,
      image_type: mimetype
    })

    res.status(201).json({ image_id: data.id })
  }
}

module.exports = { ImagesController }
