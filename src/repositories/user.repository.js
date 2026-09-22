import { ApiError } from "../errors/api.error.js";
import { read, write } from "../services/fs.service.js";
class UserRepository {
    async getList() {
        return await read();
    }
    async create(dto) {
        const users = await read();
        const newUser = {
            id: users.length ? (users[users.length - 1]?.id ?? 0) + 1 : 1,
            name: dto.name ?? '',
            age: dto.age ?? 0
        };
        users.push(newUser);
        await write(users);
        return newUser;
    }
    async getById(userId) {
        const users = await read();
        return users.find((user) => user.id === userId);
    }
    async putById(putId, dto) {
        const users = await read();
        const user = users.find((user) => user.id === putId);
        if (!user) {
            throw new ApiError("No such user", 404);
        }
        user.name = dto.name;
        user.age = dto.age;
        await write(users);
        return user;
    }
    async deleteById(deleteId) {
        const users = await read();
        const userIndex = users.findIndex(user => user.id === deleteId);
        if (userIndex === -1) {
            throw new ApiError('user does not exist', 404);
        }
        const [deletedUser] = users.splice(userIndex, 1);
        await write(users);
        return deletedUser;
    }
}
export const userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map