import {OldPassword} from "../models/old-password.model.js";
import type {IOldPassword} from "../interfaces/old-password.interface.js";

class OldPasswordRepository {
    public async create(_userId: string,password: string): Promise<IOldPassword | null> {
        return await OldPassword.create({_userId, password})
    }
    public async getAllByUserId(_userId: string)  {
        return await OldPassword.find({_userId})
    }
    public async deleteBeforeDate(date: Date): Promise<number> {
        const { deletedCount } = await OldPassword.deleteMany({ createdAt: { $lt: date } });
        return deletedCount;
    }

}

export const oldPasswordRepository = new OldPasswordRepository()