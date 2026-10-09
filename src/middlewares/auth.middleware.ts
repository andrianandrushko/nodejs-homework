import type {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error.js";
import {tokenRepository} from "../repositories/token.repository.js";
import {tokenService} from "../services/token.service.js";
import {TokenType} from "../enums/token-type.enum.js";
import {Token} from "../models/token.model.js";
import type {IActionTokenInterface} from "../interfaces/action-token.interface.js";
import type {IResetPasswordSet} from "../interfaces/user.interface.js";
import {actionTokenRepository} from "../repositories/action-token.repository.js";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum.js";



class AuthMiddleware{
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("Authorization header is required", 401);
            }
            const accessToken = header.split("Bearer ")[1];
            if (!accessToken) {
                throw new ApiError("Authorization header is required", 401);
            }
            const payload = tokenService.verifyToken(accessToken, TokenType.ACCESS);


            const pair = await tokenRepository.findByParams({accessToken});
            if (!pair) {
                throw new ApiError("Authorization header is required", 401);
            }
            res.locals.jwtPayload = payload;
            res.locals.accessToken = accessToken;
            next()
        }catch(err){
            next(err)
        }
    }
    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("Authorization header is required", 401);
            }
            const refreshToken = header.split("Bearer ")[1];
            if (!refreshToken) {
                throw new ApiError("refresh token is required", 401);
            }

            const payload = tokenService.verifyToken(refreshToken, TokenType.REFRESH);
            const pair = await tokenRepository.deleteByRefreshToken({refreshToken});
            if (!pair) {
                throw new ApiError("refresh token fot found in bd", 401);
            }
            res.locals.jwtPayload = payload;
            next()
        }catch(err){
            next(err)
        }
    }
    public async checkActionToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.body as IResetPasswordSet;
            if (!token) {
                throw new ApiError("Action token is required", 401);
            }
            const payload = await tokenService.verifyActionToken(token, ActionTokenTypeEnum.FORGOT_PASSWORD)

            const pair = await actionTokenRepository.getByToken(token);
            if (!pair) {
                throw new ApiError("Action token not found in database", 401);
            }
            res.locals.jwtPayload = payload;
            next()
        }catch (e) {
            next(e)
        }
    }

}

export const authMiddleware = new AuthMiddleware()