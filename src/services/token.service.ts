import type {ITokenPair, ITokenPayload} from "../interfaces/token.interface.js";
import jsonwebtoken from 'jsonwebtoken'
import {configs} from "../configs/user.config.js";
import {ApiError} from "../errors/api.error.js";
import { TokenType } from "../enums/token-type.enum.js";


class TokenService {
    public generateTokens(payload: ITokenPayload): ITokenPair {
        const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_TOKEN , {
            expiresIn: Number(configs.JWT_ACCESS_EXPIRATION)
        })
        const refreshToken = jsonwebtoken.sign(payload, configs.JWT_REFRESH_TOKEN , {
            expiresIn: Number(configs.JWT_REFRESH_EXPIRATION)
        })
        return {accessToken, refreshToken}
    }

    public verifyToken(token: string,type: TokenType): ITokenPayload {
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
        }catch {
            throw new ApiError(`Unable to verify token`, 401);
        }
    }
}

export const tokenService = new TokenService()