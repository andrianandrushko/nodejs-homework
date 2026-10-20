import type {NextFunction, Request, Response} from "express";
import {userService} from "../services/user.service.js";
import type {IUser} from "../interfaces/user.interface.js";
import type {ITokenPayload} from "../interfaces/token.interface.js";
import type {UploadedFile} from "express-fileupload";
import {ApiError} from "../errors/api.error.js";
import {userPresenter} from "../presenters/user.presenter.js";

class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query;
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
            const user = await userService.getById(userId);
            const result = userPresenter.toPublicResponseDto(user)
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
    public async getMe(req: Request, res: Response, next: NextFunction){
        try {
            const jwtPayload =  res.locals.jwtPayload as ITokenPayload
            const user = await userService.getMe(jwtPayload)
            const result = userPresenter.toPublicResponseDto(user)
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
    public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = res.locals.jwtPayload as ITokenPayload;
            const avatar = req.files?.avatar as UploadedFile
            const user=  await userService.uploadAvatar(jwtPayload, avatar)
            if (!user) {
                throw new ApiError('user not found',404)
            }
            const result = userPresenter.toPublicResponseDto(user)
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async deleteFile(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = res.locals.jwtPayload as ITokenPayload;
            const user = await userService.deleteFile(jwtPayload)
            if (!user) {
                throw new ApiError('user not found',404)
            }
        }catch (err){
            next(err)
        }
    }
}

export const userController = new UserController()