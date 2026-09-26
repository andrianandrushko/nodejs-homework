import type {RoleEnum} from "../enums/role.enum.js";


export interface IToken {
    _id?: number;
   accessToken: string
    refreshToken: string
    _userId: string
}

export interface ITokenPayload{
    userId: string
    role: RoleEnum
}


export interface ITokenPair {
    accessToken: string
    refreshToken: string
}
