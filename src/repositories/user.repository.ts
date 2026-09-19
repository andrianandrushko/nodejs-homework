import {read, write} from "../services/fs.service.js";
import type {IUser} from "../interfaces/user.interface.js";
import {ApiError} from "../errors/api.error.js";


class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await read()
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        const users = await read()
        const newUser: IUser = {
            id: users.length ? (users[users.length - 1]?.id ?? 0) + 1 : 1,
            name: dto.name ?? '',
            age: dto.age ?? 0
        };
        users.push(newUser)
        await write(users)
        return newUser
    }

    public async getById(userId: number): Promise<IUser | undefined> {
        const users = await read();
        return users.find((user) => user.id === userId)
    }

    public async putById(putId: number, dto: { name: string, age: number }): Promise<IUser> {
        const users = await read();
        const user = users.find((user) => user.id === putId)
        if (!user) {
            throw new ApiError("No such user", 404);
        }
        user.name = dto.name;
        user.age = dto.age;
        await write(users);
        return user
    }

    public async deleteById(deleteId: any): Promise<IUser | undefined> {
        const users = await read();
        const userIndex = users.findIndex(user => user.id === deleteId)
        if (userIndex === -1) {
            throw new ApiError('user does not exist', 404)
        }
        const [deletedUser] = users.splice(userIndex, 1)
        await write(users)
        return deletedUser
    }
}



export const userRepository = new UserRepository();