import type {RoleEnum} from "../enums/role.enum.js";
import type {UserListOrderEnum} from "../enums/user-list.order.enum.js";
import type {UserListOrderByEnum} from "../enums/user-list.order-by.enum.js";

export interface IUser {
    _id: string;
    name: string;
    age: number;
    email: string;
    avatar: string | null
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


export interface IUserListQuery {
    limit: number,
    page: number,
    search: string,
    order: UserListOrderEnum
    orderBy: UserListOrderByEnum,
}


export type IUserResponse = Omit<
    Pick<IUser, '_id' | 'name' | 'age' | 'email' | 'role' | 'avatar' | 'isVerified' | 'isDeleted'>,
    'avatar'
> & {avatar: string | null};


export interface IUserListResponse {
    data: IUserResponse[],
    total: number
}