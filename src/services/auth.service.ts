import {userRepository} from "../repositories/user.repository.js";
import type {ISignIn, IUser} from "../interfaces/user.interface.js";
import {passwordService} from "./password.service.js";
import {tokenService} from "./token.service.js";
import {tokenRepository} from "../repositories/token.repository.js";
import type {ITokenPair, ITokenPayload} from "../interfaces/token.interface.js";
import {ApiError} from "../errors/api.error.js";
import {TokenType} from "../enums/token-type.enum.js";
import {emailService} from "./email.service.js";
import {EmailTypeEnum} from "../enums/email-type.enum.js";
import type {EmailPayloadCombinedType} from "../types/email-payload-combined.type.js";

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
        await emailService.sendEmail(EmailTypeEnum.WELCOME, 'andrushkoandrian@gmail.com', {name: user.name})
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
        await emailService.sendEmail(EmailTypeEnum.LOGOUT_ALL, 'andrushkoandrian@gmail.com', { name: user.name });
        await tokenRepository.deleteByAll(userId);
    }
}


export const authService = new AuthService();