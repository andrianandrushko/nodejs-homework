import {model, Schema} from "mongoose";
import type {IUser} from "../interfaces/user.interface.js";
import {RoleEnum} from "../enums/role.enum.js";


const userSchema = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: RoleEnum, default: RoleEnum.USER },
        isVerified: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const User = model<IUser>("users", userSchema);
