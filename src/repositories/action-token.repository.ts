import type {IActionTokenInterface} from "../interfaces/action-token.interface.js";
import {ActionModel} from "../models/action-token.model.js";


class ActionTokenRepository{
    public async create(dto: Partial<IActionTokenInterface>): Promise<IActionTokenInterface> {
        return await ActionModel.create(dto)
    }
    public async getByToken(token: string): Promise<IActionTokenInterface | null> {
        return await ActionModel.findOne({ token })
    }
    public async deleteByParams(params: Partial<IActionTokenInterface>): Promise<IActionTokenInterface | null> {
        return await ActionModel.findOneAndDelete({ params })
    }
}


export const actionTokenRepository = new ActionTokenRepository()