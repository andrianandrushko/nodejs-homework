import { userService } from "../services/user.service.js";
class UserController {
    async getList(req, res, next) {
        try {
            const result = await userService.getList();
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try {
            const dto = await req.body;
            const result = await userService.create(dto);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const userId = Number(req.params.userId);
            const result = await userService.getById(userId);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async putById(req, res, next) {
        try {
            const dto = await req.body;
            const putId = Number(req.params.userId);
            const result = await userService.putById(putId, dto);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteById(req, res, next) {
        try {
            const deleteId = Number(req.params.userId);
            const result = await userService.deleteById(deleteId);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
export const userController = new UserController();
//# sourceMappingURL=user.controller.js.map