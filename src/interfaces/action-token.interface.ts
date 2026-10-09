import type {ActionTokenTypeEnum} from "../enums/action-token-type.enum.js";

export interface IActionTokenInterface{
    _id: string;
    token: string;
    type: ActionTokenTypeEnum;
    _userId: string;
}