import dotenv from 'dotenv'

dotenv.config()

export const configs = {
    APP_PORT: Number(process.env.APP_PORT) || 3001,
    APP_HOST: process.env.APP_HOST || 'localhost',
    MONGO_URI: process.env.MONGO_URI || 'mongoose',

    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN || '',
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || '',
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '',
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || '',
}