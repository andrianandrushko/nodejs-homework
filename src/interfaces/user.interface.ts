import type {RoleEnum} from "../enums/role.enum.js";

export interface IUser {
    _id: string;
    name: string;
    age: number;
    email: string;
    avatar: string
    password: string;
    role: RoleEnum;
    isVerified: boolean;
    isDeleted: boolean;
}

export interface ISignIn extends Pick<IUser, "email" | "password"> {}

export type IResetPasswordSend = Pick<IUser, 'email'>

export type IResetPasswordSet = Pick<IUser, 'password'> & {token: string}

export type IVerifyEmail = Pick<IUser, 'email'>;

export type IVerifyToken = { token: string };

export type IChangePassword = Pick<IUser, 'password'> & {oldPassword: string};