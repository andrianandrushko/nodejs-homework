import type {NextFunction, Request, Response} from "express";
import {userService} from "../services/user.service.js";
import type {IUser} from "../interfaces/user.interface.js";
import type {ITokenPayload} from "../interfaces/token.interface.js";

class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getList();
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async create(req: Request, res: Response, next: NextFunction){
        try {
            const dto = req.body as IUser;
            const result = await userService.create(dto);
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string;
            const result = await userService.getById(userId);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
    public async getMe(req: Request, res: Response, next: NextFunction){
        try {
            const jwtPayload =  res.locals.jwtPayload as ITokenPayload
            const result = await userService.getMe(jwtPayload)
            res.json(result);
        }catch (err) {
         next(err);
        }
    }
    public async putByMe(req: Request, res: Response, next: NextFunction){
        try {
            const jwtPayload =  res.locals.jwtPayload as ITokenPayload
            const dto = req.body as IUser;
            const result = await userService.putByMe(jwtPayload,dto)
            res.json(result);
        }catch (err) {
            next(err)
        }
    }
    public async deleteByMe(req: Request, res: Response, next: NextFunction) {
        try {
        const jwtPayload =  res.locals.jwtPayload as ITokenPayload
        const result = await userService.deleteByMe(jwtPayload)
        res.json(result);
        }catch (err){
            next(err)
        }
    }
}

export const userController = new UserController()