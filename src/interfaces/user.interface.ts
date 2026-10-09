import type {RoleEnum} from "../enums/role.enum.js";

export interface IUser {
    _id: string;
    name: string;
    age: number;
    email: string;
    password: string;
    role: RoleEnum;
    isVerified: boolean;
    isDeleted: boolean;
}

export interface ISignIn extends Pick<IUser, "email" | "password"> {}

export type IResetPasswordSend = Pick<IUser, 'email'>

export type IResetPasswordSet = Pick<IUser, 'password'> & {token: string}

export type IVerifyEmail = Pick<IUser, 'email'> & {token: string}

export type IVerifyToken = Pick<IUser, 'email' |'isVerified'> & {token: string}