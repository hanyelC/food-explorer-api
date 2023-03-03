import fs from 'node:fs'
import path from 'node:path'
import { TMP_FOLDER, UPLOADS_FOLDER } from '../config/upload.js'

export class DiskStorage {
  async deleteTempFile(filename) {
    const filePath = path.resolve(TMP_FOLDER, filename)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }

  async saveFile(file, filename) {
    await fs.promises.writeFile(path.resolve(UPLOADS_FOLDER, filename), file)
  }

  async deleteFile(file) {
    const filePath = path.resolve(UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }

  async getTempFile(filename) {
    const buffer = await fs.promises.readFile(
      path.resolve(TMP_FOLDER, filename)
    )

    return { buffer }
  }
}
