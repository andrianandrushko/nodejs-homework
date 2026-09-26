    import { Router } from "express";
    import { userController } from "../controllers/user.controller.js";
    import {userMiddleware} from "../middlewares/user.middleware.js";
    import {userValidateMiddleware} from "../middlewares/user.validate.middleware.js";
    import {authMiddleware} from "../middlewares/auth.middleware.js";



    const router = Router();

    router.get("/", userValidateMiddleware.validateQuery(),userController.getList);

    router.get("/me", userMiddleware.isItValid('userId'),userValidateMiddleware.validateParams(),authMiddleware.checkAccessToken,userController.getMe)

    router.put("/me", userMiddleware.isItValid('userId'),userValidateMiddleware.validateBody(),userValidateMiddleware.validateParams(),authMiddleware.checkAccessToken,userController.putByMe)

    router.delete("/me", userMiddleware.isItValid('userId'),userValidateMiddleware.validateParams(),authMiddleware.checkAccessToken,userController.deleteByMe)

    router.get("/:userId", userMiddleware.isItValid('userId'),userValidateMiddleware.validateParams(),userController.getById)


export const userRouter = router;