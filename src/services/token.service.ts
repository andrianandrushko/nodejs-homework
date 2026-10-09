import type {ITokenPair, ITokenPayload} from "../interfaces/token.interface.js";
import jsonwebtoken from 'jsonwebtoken'
import {configs} from "../configs/user.config.js";
import {ApiError} from "../errors/api.error.js";
import { TokenType } from "../enums/token-type.enum.js";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum.js";
import js = require("@eslint/js");


class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_TOKEN, {
            expiresIn: "10m"
        })
        const refreshToken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_TOKEN, {
            expiresIn: "30d"
        })
        return {accessToken, refreshToken}
    }

    public verifyToken(token: string, type: TokenType): ITokenPayload {
        try {
            let secret: string
            switch (type) {
                case TokenType.ACCESS:
                    secret = configs.JWT_ACCESS_TOKEN;
                    break;

                case TokenType.REFRESH:
                    secret = configs.JWT_REFRESH_TOKEN;
                    break;
            }
            return jsonwebtoken.verify(token, secret) as ITokenPayload;
        } catch {
            throw new ApiError(`Unable to verify token`, 401);
        }
    }

    public generateActionTokens(payload: ITokenPayload, tokenType: ActionTokenTypeEnum): string {
            let secret: string
            switch (tokenType) {
                case ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = configs.ACTION_FORGOT_PASSWORD
                    break
                default:
                    throw new ApiError(`Unable to verify token`, 401);
            }
            return jsonwebtoken.sign(payload, secret, {expiresIn: '10h'})
    }
    public async verifyActionToken(token: string, type:ActionTokenTypeEnum): Promise<ITokenPayload> {
            try {
                let secret: string
                switch (type) {
                    case ActionTokenTypeEnum.FORGOT_PASSWORD:
                        secret = configs.ACTION_FORGOT_PASSWORD
                        break
                    default:
                        throw new ApiError(`Unable to verify token`, 400);
                }
                return jsonwebtoken.verify(token, secret) as ITokenPayload
            }catch (e) {
                console.log(e)
                throw new ApiError(`Unable to verify token`, 401);
            }
    }
    public async generateVerifyEmail(payload: ITokenPayload, type: ActionTokenTypeEnum) {
        let secret: string
        switch (type) {
            case ActionTokenTypeEnum.VERIFY_EMAIL:
                secret = configs.SEND_VERIFY_EMAIL
                break
            default:
                throw new ApiError('email not found', 400)
        }
        return jsonwebtoken.sign(payload, secret, {expiresIn: '10h'})
    }
    public async verifySendEmail(token: string, type:ActionTokenTypeEnum):Promise<ITokenPayload> {
        try {
            let secret: string
            switch (type) {
                case ActionTokenTypeEnum.VERIFY_EMAIL:
                    secret = configs.SEND_VERIFY_EMAIL
                    break
                default:
                    throw new ApiError(`Unable to verify email`, 401);
            }
            return jsonwebtoken.verify(token,secret) as ITokenPayload;
        }catch (err) {
            console.log(err)
            throw new ApiError(`Unable to verify email`, 401);
        }
    }
}

export const tokenService = new TokenService()