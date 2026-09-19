import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
const router = Router();
router.get("/", userController.getList);
router.post("/", userController.create);
router.get("/:userId", userController.getById);
router.put("/:userId", userController.putById);
router.delete("/:userId", userController.deleteById);
export const userRouter = router;
//# sourceMappingURL=user.router.js.map