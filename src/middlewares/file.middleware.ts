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
                const { error } = FileValidation.validate(req.files?.avatar)
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