import {model, Schema} from "mongoose";
import {User} from "./user.model.js";
import type {IOldPassword} from "../interfaces/old-password.interface.js";


const OldSchema = new Schema(
    {
        password: { type: String, required: true },
        _userId: {type: Schema.Types.ObjectId, ref: User},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const OldPassword = model<IOldPassword>("OldPassword", OldSchema);