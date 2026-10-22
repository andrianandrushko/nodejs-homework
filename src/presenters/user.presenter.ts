import type {IUser, IUserListQuery, IUserListResponse, IUserResponse} from "../interfaces/user.interface.js";
import {configs} from "../configs/user.config.js";


class UserPresenter{
   public toPublicResponseDto(entity: IUser): IUserResponse {
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
    public toListResponseDto(entity: IUser[], total: number,query:IUserListQuery): IUserListResponse  {
       return{
           data: entity.map(this.toPublicResponseDto),
           total,
           ...query
       }
    }
}


export const userPresenter = new UserPresenter();