import type {NextFunction, Request, Response} from "express";
import {ApiError} from "../errors/api.error.js";
import {tokenRepository} from "../repositories/token.repository.js";
import {tokenService} from "../services/token.service.js";
import {TokenType} from "../enums/token-type.enum.js";



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

}

export const authMiddleware = new AuthMiddleware()