import type {NextFunction, Request, Response} from "express";



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
                next()
            }catch (err) {
                next(err);
            }
        }
    }
}

export const fileMiddleware = new FileMiddleware()