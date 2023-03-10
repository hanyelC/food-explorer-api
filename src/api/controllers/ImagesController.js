import fs from 'node:fs'
import path from 'node:path'

import { ImagesRepository } from '../repositories/images/ImagesRepository.js'

import { TMP_FOLDER } from '../../config/upload.js'
import { DiskStorage } from '../../providers/DiskStorage.js'

export class ImagesController {
  async create(req, res) {
    const { filename, mimetype } = req.file

    const buffer = await fs.promises.readFile(
      path.resolve(TMP_FOLDER, filename)
    )

    const repository = new ImagesRepository()
    const data = await repository.create({
      id: filename.split('.')[0],
      image_buffer: buffer,
      image_name: filename,
      image_type: mimetype,
    })

    const diskStorage = new DiskStorage()

    await diskStorage.deleteTempFile(filename)

    res.status(201).json({ image_name: data.image_name, image_id: data.id })
  }

  async show(req, res) {
    const { image_name } = req.params

    const repository = new ImagesRepository()

    const id = image_name.split('.')[0]

    const image = await repository.findById(id)

    if (!image) {
      return res.status(404).json({ message: 'Image not found' })
    }

    return res.send(image.image_data)
  }
}
