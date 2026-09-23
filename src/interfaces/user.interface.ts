import type {RoleEnum} from "../enums/role.enum.js";

export interface IUser {
    id:number;
    name: string;
    age: number;
    phone: string;
    role: RoleEnum;
    isVerified: boolean;
    isDeleted: boolean
}