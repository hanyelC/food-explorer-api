import { IngredientsRepository } from '../repositories/ingredients/IngredientsRepository.js'
import { IngredientCreateService } from '../services/ingredients/IngredientCreateService.js'
import { ImagesRepository } from '../repositories/images/ImagesRepository.js'
import { DiskStorage } from '../../providers/DiskStorage.js'

export class IngredientsController {
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
