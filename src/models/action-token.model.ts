import {model, Schema} from "mongoose";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum.js";
import {User} from "./user.model.js";
import type {IActionTokenInterface} from "../interfaces/action-token.interface.js";


const ActionTokenModel = new Schema(
    {
        token:{type:String, required: true},
        type:{type: String, enum: ActionTokenTypeEnum, required: true},

        _userId: {type: Schema.Types.ObjectId, ref: User, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const ActionModel = model<IActionTokenInterface>("action-tokens", ActionTokenModel)