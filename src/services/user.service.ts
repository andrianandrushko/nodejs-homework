import {userRepository} from "../repositories/user.repository.js";
import type {IUser} from "../interfaces/user.interface.js";
import {ApiError} from "../errors/api.error.js";

class UserService{
    public async getList():Promise<IUser[]> {
        return await userRepository.getList();
    }
    public async create(dto: Partial<IUser>): Promise<IUser> {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError("Name must be 3 characters", 400);
        }
        if (!dto.age || dto.age < 0) {
            throw new ApiError("Age must be greater than 0", 400);
        }
        return await userRepository.create(dto);
    }
    public async getById(userId: number): Promise<IUser> {
        const user = await userRepository.getById(userId)
        if (!user){
            throw new ApiError("User not found", 404);
        }
        return user
    }
    public async putById(putId: number, dto: {name: string, age: number}): Promise<IUser | void> {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError("Name must be 3 characters", 400);
        }
        if (!dto.age || dto.age < 0) {
            throw new ApiError("Age must be greater than 0", 400);
        }
        return  await userRepository.putById(putId, dto);
    }
    public async deleteById(userId: number): Promise<void> {
        await userRepository.deleteById(userId);
    }
}


export const userService = new UserService();