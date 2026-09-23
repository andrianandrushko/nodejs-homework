    import type {IUser} from "../interfaces/user.interface.js";
    import {User} from "../models/user.model.js";


    class UserRepository {
        public async getList(): Promise<IUser[]> {
            return await User.find({})
        }

        public async create(dto: Partial<IUser>): Promise<IUser> {
           return await User.create(dto)
        }

        public async getById(userId: string): Promise<IUser | null> {
            return await User.findById(userId)
        }

        public async putById(putId: string, dto: { name: string, age: number }): Promise<IUser | null> {
          return await User.findByIdAndUpdate(putId,dto, {new: true})
        }

        public async deleteById(deleteId: string): Promise<IUser | null> {
            return await User.findByIdAndDelete({_id: deleteId})
        }
    }



    export const userRepository = new UserRepository();