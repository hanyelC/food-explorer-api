require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  baseUrlLocal: process.env.LOCAL_URL
}