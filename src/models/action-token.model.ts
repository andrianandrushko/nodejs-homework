import {model, Schema} from "mongoose";
import {User} from "./user.model.js";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum.js";
import type {IActionTokenInterface} from "../interfaces/action-token.interface.js";


const actionSchema = new Schema(
    {
        token: {type: String, required: true},
        type: { type: String, required: true ,enum: ActionTokenTypeEnum},

        _userId: {type: Schema.Types.ObjectId, ref: User},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const ActionToken = model<IActionTokenInterface>('action-tokens', actionSchema)