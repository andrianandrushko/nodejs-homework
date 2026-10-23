import Joi from "joi";
import {UserListOrderEnum} from "../enums/user-list.order.enum.js";
import {UserListOrderByEnum} from "../enums/user-list.order-by.enum.js";


 export const UserBodyValidation = Joi.object(
    {
        name: Joi.string().min(3).max(10).required().messages({
            "string.min": "name must be at least 3 characters ",
            "string.max": "maximum characters 10"
        }),
        age: Joi.number().min(1).integer().max(100).required().messages({
            "number.min": "age must be at least 1 age",
            "number.max": "maximum age 100"
        }),
    }
)

export const UserParamsValidation = Joi.object(
    {
        userId: Joi.string().required()
    }
)

export class UserQueryValidation {
    public static listQuery = Joi.object({
        page: Joi.number().min(1).default(1),
        limit: Joi.number().min(1).max(100).default(10),
        search: Joi.string().trim().lowercase(),
        order: Joi.string().valid(...Object.values(UserListOrderEnum)),
        orderBy: Joi.string().valid(...Object.values(UserListOrderByEnum)),
    });
}
