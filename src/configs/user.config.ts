import dotenv from 'dotenv'
import type {ObjectCannedACL} from "@aws-sdk/client-s3";

dotenv.config()

export const configs = {
    APP_PORT: Number(process.env.APP_PORT) || 3001,
    APP_HOST: process.env.APP_HOST || 'localhost',
    MONGO_URI: process.env.MONGO_URI || 'mongoose',

    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN || '',
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || '',
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '',
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || '',
    SMTP_EMAIL: process.env.SMTP_EMAIL || '',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
    ACTION_FORGOT_PASSWORD: process.env.ACTION_FORGOT_PASSWORD || '',
    ACTION_FORGOT_PASSWORD_EXPIRATION:  process.env.ACTION_FORGOT_PASSWORD_EXPIRATION || '',
    SEND_VERIFY_EMAIL: process.env.SEND_VERIFY_EMAIL || '',
    SEND_VERIFY_EMAIL_EXPIRATION: process.env.SEND_VERIFY_EMAIL_EXPIRATION || '',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || '',
    AWS_S3_REGION: process.env.AWS_S3_REGION || '',
    AWS_S3_ACL: process.env.AWS_S3_ACL as  ObjectCannedACL,
    AWS_S3_ENDPOINT: process.env.AWS_S3_ENDPOINT || '',
}