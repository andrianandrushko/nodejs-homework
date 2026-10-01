import {Token} from "../models/token.model.js";
import type {IToken} from "../interfaces/token.interface.js";
import type {DeleteResult} from "mongoose";


class TokenRepository {
    public async create(dto: Partial<IToken>): Promise<IToken> {
        return await Token.create(dto)
    }
    public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
        return await Token.findOne(params)
    }
    public async deleteByRefreshToken({ refreshToken }: { refreshToken: string }): Promise<IToken | null> {
        return await Token.findOneAndDelete({ refreshToken });
    }
    public async deleteByOne({accessToken}: { accessToken: string }): Promise<DeleteResult> {
        return await Token.deleteOne({accessToken})
    }
    public async deleteByAll(_userId: string ): Promise<DeleteResult> {
        return await Token.deleteMany({_userId})
    }
}

export const tokenRepository = new TokenRepository();