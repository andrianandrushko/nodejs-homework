import {model, Schema} from "mongoose";
import type {IUser} from "../interfaces/user.interface.js";
import {RoleEnum} from "../enums/role.enum.js";


const userSchema = new Schema(
    {
        name: {type: String, required: true},
        age: {type: Number, required: true},
        phone: {type: String, required: false},
        role: {type: String, enum: RoleEnum, default: RoleEnum.USER},
        isVerified: {type: Boolean, default: false},
        isDeleted: {type: Boolean, default: false},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const User = model<IUser>("users", userSchema);
