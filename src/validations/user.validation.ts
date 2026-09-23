import Joi from "joi";


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

export const UserQueryValidation = Joi.object(
    {
        name: Joi.string().min(3).trim().max(10),
        age: Joi.number().min(1).integer().max(100),
    }
)


