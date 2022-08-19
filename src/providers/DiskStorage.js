const fs = require('fs')
const path = require('path')
const { TMP_FOLDER, UPLOADS_FOLDER } = require('../config/upload')

class DiskStorage {
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
}

module.exports = { DiskStorage }
