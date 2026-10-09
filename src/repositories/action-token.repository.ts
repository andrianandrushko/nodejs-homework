import {ActionToken} from "../models/action-token.model.js";
import type {IActionTokenInterface} from "../interfaces/action-token.interface.js";


class ActionTokenRepository{
    public async create(dto: Partial<IActionTokenInterface>): Promise<IActionTokenInterface> {
        return await ActionToken.create(dto)
    }
    public async getByToken(token: string,): Promise<IActionTokenInterface | null> {
        return await ActionToken.findOne({ token })
    }
    public async deleteManyBaParams(params: Partial<IActionTokenInterface>): Promise<void> {
      await ActionToken.deleteMany(params)
    }
    public async getByVerifyToken(token: string, isVerified: boolean): Promise<IActionTokenInterface | null> {
        return await ActionToken.findOne({ token, isVerified })
    }
}

export const actionTokenRepository = new ActionTokenRepository()