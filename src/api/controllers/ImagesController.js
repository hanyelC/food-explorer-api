const fs = require('fs')
const path = require('path')

const { ImagesRepository } = require('../repositories/images/ImagesRepository')

const { TMP_FOLDER, UPLOADS_FOLDER } = require('../../config/upload')
const { DiskStorage } = require('../../providers/DiskStorage')

class ImagesController {
  async create(req, res) {
    const { filename, mimetype } = req.file

    const buffer = await fs.promises.readFile(path.resolve(TMP_FOLDER, filename))

    const repository = new ImagesRepository()
    const data = await repository.create({
      id: filename.split('.')[0],
      image_buffer: buffer,
      image_name: filename,
      image_type: mimetype
    })

    const diskStorage = new DiskStorage()

    await diskStorage.deleteTempFile(filename)

    res.status(201).json({ image_name: data.image_name, image_id: data.id })
  }

  async show(req, res) {
    const { image_name } = req.params

    let fileExists

    try {
      await fs.promises.access(path.resolve(UPLOADS_FOLDER, image_name))
      fileExists = true
    } catch {
      fileExists = false
    }

    if (fileExists) {
      return res.redirect(`/files/${image_name}`)
    }

    const repository = new ImagesRepository()

    const id = image_name.split('.')[0]

    const image = await repository.findById(id)

    if (!image) {
      return res.status(404).json({ message: "Image not found" })
    }

    const diskStorage = new DiskStorage()
    diskStorage.saveFile(image.image_data, image_name)

    return res.redirect(`/files/${image_name}`)
  }
}

module.exports = { ImagesController }
