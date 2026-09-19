import type {NextFunction, Request, Response} from "express";
import {userService} from "../services/user.service.js";
import type {IUser} from "../interfaces/user.interface.js";

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
            const dto = await req.body as IUser;
            const result = await userService.create(dto);
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction){
        try {
            const userId = Number(req.params.userId);
            const result = await userService.getById(userId);
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async putById(req: Request, res: Response, next: NextFunction){
        try {
            const dto = await req.body as IUser;
            const putId = Number(req.params.userId);
            const result = await userService.putById(putId,dto)
            res.json(result);
        }catch (err) {
            next(err)
        }
    }
    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
        const deleteId = Number(req.params.userId);
        const result = await userService.deleteById(deleteId)
        res.json(result);
        }catch (err){
            next(err)
        }
    }
}

export const userController = new UserController()