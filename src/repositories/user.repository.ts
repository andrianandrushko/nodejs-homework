    import type {IUser, IUserListQuery} from "../interfaces/user.interface.js";
    import {User} from "../models/user.model.js";
    import type {QueryFilter} from "mongoose";


    class UserRepository {
        public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
            const filterObj: QueryFilter<IUser> = {isVerified: true}
            if (query.search) {
                filterObj.name = {$regex: query.search, $options: "i"};
            }
            const skip = query.limit * (query.page -1)
            return await Promise.all([
                User.find(filterObj).limit(query.limit).skip(skip),
                User.countDocuments(filterObj)
            ])
        }

        public async create(dto: Partial<IUser>): Promise<IUser> {
           return await User.create(dto)
        }

        public async getById(userId: string): Promise<IUser | null> {
            return await User.findById(userId).select('+password')
        }

        public async putById(putId: string, dto: Partial<IUser>): Promise<IUser | null> {
          return await User.findByIdAndUpdate(putId,dto, {new: true})
        }

        public async deleteById(deleteId: string): Promise<IUser | null> {
            return await User.findByIdAndDelete({_id: deleteId})
        }
        public async getByEmail(email: string): Promise<IUser | null> {
            return await User.findOne({ email })
        }
    }



    export const userRepository = new UserRepository();