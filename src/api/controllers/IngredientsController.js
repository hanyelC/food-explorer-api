const { IngredientsRepository } = require('../repositories/ingredients/IngredientsRepository')
const { IngredientCreateService } = require('../services/ingredients/IngredientCreateService')
const { ImagesRepository } = require('../repositories/images/ImagesRepository')
const { DiskStorage } = require('../../providers/DiskStorage')

class IngredientsController {
  async create(req, res) {
    const { filename, mimetype } = req.file
    const { name } = req.body

    const { deleteTempFile, getTempFile } = new DiskStorage()

    const { buffer } = await getTempFile(filename)
    await deleteTempFile(filename)

    const imageRepository = new ImagesRepository()

    const { id: image_id } = await imageRepository.create({
      id: filename.split('.')[0],
      image_buffer: buffer,
      image_name: filename,
      image_type: mimetype,
    })

    const repository = new IngredientsRepository()
    const ingredientCreateService = new IngredientCreateService(repository)

    const { id } = await ingredientCreateService.execute({ name, image_id })

    return res.json({ id })
  }
}

module.exports = { IngredientsController }
