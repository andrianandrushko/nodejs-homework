import { User } from "../models/user.model.js";
class UserRepository {
    async getList() {
        return await User.find({});
    }
    async create(dto) {
        return await User.create(dto);
    }
    async getById(userId) {
        return await User.findById(userId);
    }
    async putById(putId, dto) {
        return await User.findByIdAndUpdate(putId, dto, { new: true });
    }
    async deleteById(deleteId) {
        return await User.findByIdAndDelete({ _id: deleteId });
    }
}
export const userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map