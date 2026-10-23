import type {NextFunction, Request, Response} from "express";
import {FileValidation} from "../validations/file.validation.js";
import {ApiError} from "../errors/api.error.js";



class FileMiddleware{
    public isFileValid() {
        return (req: Request, res: Response, next: NextFunction)=> {
            try {
                next()
            }catch (err) {
                next(err);
            }
        }
    }
    public FileValidation() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const avatar = req.files?.avatar
                if (!avatar) {
                    throw new ApiError('avatar not found',400)
                }
                const { error } = FileValidation.validate(avatar)
                if (error) {
                    throw new ApiError(error.message, 400)
                }
                next()
            }catch (err) {
                next(err);
            }
        }
    }
}

export const fileMiddleware = new FileMiddleware()