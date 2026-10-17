import type {IUser} from "../interfaces/user.interface.js";
import {configs} from "../configs/user.config.js";


class UserPresenter{
    toPublicResponseDto(entity: IUser) {
        return{
            _id: entity._id,
            name: entity.name,
            email: entity.email,
            age: entity.age,
            role: entity.role,
            avatar: entity.avatar ? `${configs.AWS_S3_ENDPOINT}/${entity.avatar}`: null,
            isVerified: entity.isVerified,
            isDeleted: entity.isDeleted,
        }
    }
}


export const userPresenter = new UserPresenter();