import {model, Schema} from "mongoose";
import {User} from "./user.model.js";
import type { IToken } from "../interfaces/token.interface.js";


const tokenSchema = new Schema(
    {
        accessToken: {type: String, required: true},
        refreshToken: {type: String, required: true},

        _userId: {type: Schema.Types.ObjectId, ref: User},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const Token = model<IToken>("tokens", tokenSchema);