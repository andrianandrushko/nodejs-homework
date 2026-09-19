import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../errors/api.error.js";
class UserService {
    async getList() {
        return await userRepository.getList();
    }
    async create(dto) {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError("Name must be 3 characters", 400);
        }
        if (!dto.age || dto.age < 0) {
            throw new ApiError("Age must be greater than 0", 400);
        }
        return await userRepository.create(dto);
    }
    async getById(userId) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not found", 400);
        }
        return user;
    }
    async putById(putId, dto) {
        if (!dto.name || dto.name.length < 3) {
            throw new ApiError("Name must be 3 characters", 400);
        }
        if (!dto.age || dto.age < 0) {
            throw new ApiError("Age must be greater than 0", 400);
        }
        return await userRepository.putById(putId, dto);
    }
    async deleteById(userId) {
        await userRepository.deleteById(userId);
    }
}
export const userService = new UserService();
//# sourceMappingURL=user.service.js.map