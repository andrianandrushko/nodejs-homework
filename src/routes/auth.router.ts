import {Router} from "express";
import {authController} from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";



const router = Router();

router.post("/sign-up",authController.signUp);
router.post("/sign-in",authController.signIn);
router.post("/refresh", authMiddleware.checkRefreshToken, authController.refresh)
router.post("/logout",authMiddleware.checkAccessToken,authController.logout)
router.post("/logout-all",authMiddleware.checkAccessToken,authController.logoutByAll)
router.post("/forgot-password",authController.forgotPasswordSendEmail)
router.put("/forgot-password",authMiddleware.checkActionToken,authController.forgotPasswordSet)

export const authRouter = router;