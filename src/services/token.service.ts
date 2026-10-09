import type {ITokenPair, ITokenPayload} from "../interfaces/token.interface.js";
import jsonwebtoken from 'jsonwebtoken'
import {configs} from "../configs/user.config.js";
import {ApiError} from "../errors/api.error.js";
import { TokenType } from "../enums/token-type.enum.js";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum.js";



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

    public async generateActionToken(payload: ITokenPayload, tokenType: ActionTokenTypeEnum): Promise<string> {
        try {
            let secret: string
            let expiresIn: string
            switch (tokenType) {
                case ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = configs.ACTION_FORGOT_PASSWORD
                    expiresIn = configs.ACTION_FORGOT_PASSWORD_EXPIRATION
                    break
                    default:
                    throw new ApiError(`Invalid action token type`, 400);
            }
            return jsonwebtoken.sign(payload, secret, {expiresIn: '10h'});

        } catch (error) {
            throw new ApiError(`Unable to generate action token`, 500);
        }
    }
    public async verifyActionToken(token: string, tokenType: ActionTokenTypeEnum): Promise<ITokenPayload> {
        try {
            let secret: string
            switch (tokenType) {
                case ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = configs.ACTION_FORGOT_PASSWORD
                    break
                default:
                    throw new ApiError(`Invalid action token type`, 400);
            }
            return jsonwebtoken.verify(token, secret) as ITokenPayload;
        } catch {
            throw new ApiError(`Unable to verify action token`, 401);
        }
    }
}
export const tokenService = new TokenService()