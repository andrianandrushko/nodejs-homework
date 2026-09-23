import dotenv from 'dotenv'

dotenv.config()

export const configs = {
    APP_PORT: Number(process.env.APP_PORT) || 3001,
    APP_HOST: process.env.APP_HOST || 'localhost',
    MONGO_URI: process.env.MONGO_URI || 'mongoose',
}