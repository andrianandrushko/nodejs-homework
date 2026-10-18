import {userRepository} from "../repositories/user.repository.js";
import type {
    IChangePassword,
    IResetPasswordSend,
    IResetPasswordSet,
    ISignIn,
    IUser,
    IVerifyEmail, IVerifyToken
} from "../interfaces/user.interface.js";
import {passwordService} from "./password.service.js";
import {tokenService} from "./token.service.js";
import {tokenRepository} from "../repositories/token.repository.js";
import type {ITokenPair, ITokenPayload} from "../interfaces/token.interface.js";
import {ApiError} from "../errors/api.error.js";
import {emailService} from "./email.service.js";
import {EmailTypeEnum} from "../enums/email-type.enum.js";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum.js";
import {actionTokenRepository} from "../repositories/action-token.repository.js";
import {oldPasswordRepository} from "../repositories/old-password.repository.js";
import type {IOldPassword} from "../interfaces/old-password.interface.js";
import {authController} from "../controllers/auth.controller.js";

class AuthService {
    public async sighUp(dto: Partial<IUser>): Promise<{ user: IUser, tokens: ITokenPair }> {
        if (!dto.password) {
            throw new ApiError('password failed', 401)
        }
        if (!dto.email) {
            throw new ApiError('email failed', 401)
        }
        const password = await passwordService.hashPassword(dto.password)
        const user = await userRepository.create({...dto, password})
        const tokens = tokenService.generateTokens({userId: user._id, role: user.role})
        await tokenRepository.create({...tokens, _userId: user._id})
        try {
            await emailService.sendEmail(EmailTypeEnum.WELCOME, user.email, {name: user.name})
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
        return {user, tokens}
    }

    public async sighIn(dto: ISignIn): Promise<{ user: IUser, tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email)
        if (!user) {
            throw new ApiError('user not found', 404)
        }

        const isPasswordCorrect = await passwordService.comparePassword(dto.password, user.password)
        if (!isPasswordCorrect) {
            throw new ApiError('password not correct', 401)
        }
        const tokens = tokenService.generateTokens({userId: user._id, role: user.role})
        await tokenRepository.create({...tokens, _userId: user._id})
        return {user, tokens}
    }

    public async refresh(jwtPayload: ITokenPayload): Promise<ITokenPair> {
        const tokens = tokenService.generateTokens({userId: jwtPayload.userId, role: jwtPayload.role})
        await tokenRepository.create({...tokens, _userId: jwtPayload.userId})
        return tokens;
    }

    public async logout(accessToken: string) {
        await tokenRepository.deleteByOne({accessToken})
    }

    public async logoutAll(userId: string) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError('user not found', 404);
        }
        await tokenRepository.deleteByAll(userId);
        try {
            await emailService.sendEmail(EmailTypeEnum.LOGOUT_ALL, user.email, { name: user.name });
        } catch (error) {
            console.error('Failed to send logout email:', error);
        }
    }
    public async forgotPasswordSendEmail(dto:IResetPasswordSend): Promise<void> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError('user not found', 404);
        }
        const token = tokenService.generateActionTokens({role: user.role,userId: user._id},ActionTokenTypeEnum.FORGOT_PASSWORD)
        await actionTokenRepository.create({token,type: ActionTokenTypeEnum.FORGOT_PASSWORD,_userId: user._id})
        await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, user.email,{name: user.name, email: user.email, actionToken: token})
    }
    public async forgotPasswordSet(dto: IResetPasswordSet, jwtPayload: ITokenPayload): Promise<void> {
        const password = await passwordService.hashPassword(dto.password)
        await userRepository.putById(jwtPayload.userId, {password})
        await actionTokenRepository.deleteManyBaParams({type: ActionTokenTypeEnum.FORGOT_PASSWORD,_userId: jwtPayload.userId})
    }
    public async SendVerifyEmail(dto: IVerifyEmail): Promise<void> {
        const user = await userRepository.getByEmail(dto.email)
        if (!user) {
            throw new ApiError('user not found', 404)
        }
        const token = await tokenService.generateVerifyEmail({ role: user.role, userId: user._id }, ActionTokenTypeEnum.VERIFY_EMAIL)
        console.log(token)
        await actionTokenRepository.create({ token, type: ActionTokenTypeEnum.VERIFY_EMAIL, isVerified: user.isVerified })
        await emailService.sendEmail(EmailTypeEnum.VERIFY_EMAIL, user.email, {email: user.email, isVerified: user.isVerified, verifyToken: token})
    }
    public async SendVerifyToken(userId: string, token: string): Promise<void> {
        await userRepository.putById(userId, {isVerified: true})
        await actionTokenRepository.deleteManyBaParams({type: ActionTokenTypeEnum.VERIFY_EMAIL, token})
    }
    public async changePassword(jwtPayload: ITokenPayload,dto: IChangePassword): Promise<void> {
        const user = await userRepository.getById(jwtPayload.userId)
        if (!user){
            throw new ApiError('user not found', 401)
        }
        const isPasswordCorrect = await passwordService.comparePassword(
            dto.oldPassword,
            user.password
        );
        if (!isPasswordCorrect) {
            throw new ApiError('password not correct', 401)
        }
        if (await passwordService.comparePassword(dto.password, user.password)) {
            throw new ApiError('password already used', 409)
        }
        await this.checkPasswordOldPassword(jwtPayload,dto)
        await oldPasswordRepository.create(jwtPayload.userId, user.password)
        const password = await passwordService.hashPassword(dto.password)
        await userRepository.putById(jwtPayload.userId, {password})
        await tokenRepository.deleteManyParams({_userId: jwtPayload.userId})
    }
    public async checkPasswordOldPassword(jwtPayload: ITokenPayload,dto: IChangePassword):Promise<void> {
        const oldPassword = await oldPasswordRepository.getAllByUserId(jwtPayload.userId)
        for (const old of oldPassword) {
            if (await passwordService.comparePassword(dto.password, old.password)){
                throw new ApiError('password was used in the last 180 days', 409)
            }
        }
    }
}


export const authService = new AuthService();