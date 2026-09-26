import {Token} from "../models/token.model.js";
import type {IToken} from "../interfaces/token.interface.js";


class TokenRepository {
    public async create(dto: Partial<IToken>): Promise<IToken> {
        return await Token.create(dto)
    }
    public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
        return await Token.findOne(params)
    }
}

export const tokenRepository = new TokenRepository();