import {userRepository} from "../repositories/user.repository.js";
import type {IUser} from "../interfaces/user.interface.js";
import {ApiError} from "../errors/api.error.js";
import {passwordService} from "./password.service.js";
import type {ITokenPayload} from "../interfaces/token.interface.js";

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
        if (!dto.password) {
            throw new ApiError("Password is required", 400);
        }
        const password = await passwordService.hashPassword(dto.password)
        return await userRepository.create({...dto, password});
    }
    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId)
        if (!user){
            throw new ApiError("User not found", 400);
        }
        return user
    }
    public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
        const user = await userRepository.getById(jwtPayload.userId)
        if (!user){
            throw new ApiError("User not found", 400);
        }
        return user
    }

    public async putByMe(jwtPayload: ITokenPayload, dto: {name: string, age: number}): Promise<IUser | null> {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError("Name must be 3 characters", 400);
        }
        if (!dto.age || dto.age < 0) {
            throw new ApiError("Age must be greater than 0", 400);
        }
        return  await userRepository.putById(jwtPayload.userId, dto);
    }
    public async deleteByMe(jwtPayload: ITokenPayload): Promise<void> {
        await userRepository.deleteById(jwtPayload.userId);
    }
}


export const userService = new UserService();