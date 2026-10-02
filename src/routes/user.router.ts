    import { Router } from "express";
    import { userController } from "../controllers/user.controller.js";
    import {userMiddleware} from "../middlewares/user.middleware.js";
    import {userValidateMiddleware} from "../middlewares/user.validate.middleware.js";
    import {authMiddleware} from "../middlewares/auth.middleware.js";



    const router = Router();

    router.get("/", userValidateMiddleware.validateQuery(), userController.getList);

    router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

    router.put("/me", authMiddleware.checkAccessToken, userValidateMiddleware.validateBody(), userController.putByMe);

    router.delete("/me", authMiddleware.checkAccessToken, userController.deleteByMe);

    router.get("/:userId", userValidateMiddleware.validateParams(), userMiddleware.isItValid("userId"), userController.getById);


export const userRouter = router;