import type {NextFunction, Request, Response} from "express";
import type {ISignIn, IUser} from "../interfaces/user.interface.js";
import {authService} from "../services/auth.service.js";
import type {ITokenPayload} from "../interfaces/token.interface.js";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IUser;
            const result = await authService.sighUp(dto);
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async signIn(req: Request, res: Response, next: NextFunction){
        try {
            const dto = req.body as ISignIn;
            const result = await authService.sighIn(dto);
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload =  res.locals.jwtPayload as ITokenPayload
            const result = await authService.refresh(jwtPayload)
            res.json(result);
        }catch (err) {
            next(err)
        }
    }
    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken =  res.locals.accessToken;
            const result = await authService.logout(accessToken)
            res.json(result);
        }catch (err){
            next(err)
        }
    }
    public async logoutByAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.jwtPayload.userId;
            const result = await authService.logoutAll(userId)
            res.json(result);
        }catch (err){
            next(err)
        }
    }
}

export const authController = new AuthController()