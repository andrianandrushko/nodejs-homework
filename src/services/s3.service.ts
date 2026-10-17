import {configs} from "../configs/user.config.js";
import type {UploadedFile} from "express-fileupload";
import type {FileItemTypeEnum} from "../enums/file.item-type.enum.js";
import {DeleteObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {randomUUID} from "node:crypto";
import path from "path";


class S3Service {
    constructor(
        public readonly client = new S3Client({
            region: configs.AWS_S3_REGION,
            credentials: {
                accessKeyId: configs.AWS_ACCESS_KEY,
                secretAccessKey: configs.AWS_SECRET_KEY
            }
        }),
    ) {}

    public async uploadFile(file: UploadedFile, itemType: FileItemTypeEnum, itemId: string): Promise<string> {
        try {
            const filePath = this.buildPath(itemType, itemId, file.name)
            await this.client.send(
                new PutObjectCommand({
                    Bucket: configs.AWS_S3_BUCKET_NAME,
                    Key: filePath,
                    Body: file.data,
                    ContentType: file.mimetype,
                    ACL: configs.AWS_S3_ACL
                })
            )
            return filePath
        }catch(err) {
            console.log(err)
            throw err
        }
    }
    public async deleteFile(filePath: string): Promise<void> {
        try {
            await this.client.send(
                new DeleteObjectCommand({
                    Bucket: configs.AWS_S3_BUCKET_NAME,
                    Key: filePath,
                })
            )
        }catch(err) {
            console.log(err)
            throw err
        }
    }
    private buildPath(itemType: FileItemTypeEnum, itemId: string, fileName: string):string {
        return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`
    }

}



export const s3Service = new S3Service()