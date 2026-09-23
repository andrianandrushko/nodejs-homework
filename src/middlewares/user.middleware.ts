import { type NextFunction,type Request, type Response } from "express";
import {isObjectIdOrHexString} from "mongoose";
import {ApiError} from "../errors/api.error.js";


class UserMiddleware{
public isItValid(key: string) {
    return (req: Request,res: Response, next: NextFunction)=>{
    try {
        if (!isObjectIdOrHexString(req.params[key])) {
            throw new ApiError("Invalid id", 404);
        }
        next()
    }catch (err) {
        next(err)
    }
    }
}
}


export const userMiddleware = new UserMiddleware();