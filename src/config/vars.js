import * as dotenv from 'dotenv'
dotenv.config()

export const  env = process.env.NODE_ENV
export const  port = 3333
export const  baseUrlLocal = process.env.LOCAL_URL
export const  jwtSecret = process.env.JWT_SECRET
export const  jwtExpirationInterval = process.env.JWT_EXPIRATION_MINUTES
