import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { userValidateMiddleware } from "../middlewares/user.validate.middleware.js";
const router = Router();
router.get("/", userValidateMiddleware.validateQuery(), userController.getList);
router.post("/", userValidateMiddleware.validateBody(), userController.create);
router.get("/:userId", userMiddleware.isItValid('userId'), userValidateMiddleware.validateParams(), userController.getById);
router.put("/:userId", userMiddleware.isItValid('userId'), userValidateMiddleware.validateBody(), userValidateMiddleware.validateParams(), userController.putById);
router.delete("/:userId", userMiddleware.isItValid('userId'), userValidateMiddleware.validateParams(), userController.deleteById);
export const userRouter = router;
//# sourceMappingURL=user.router.js.map