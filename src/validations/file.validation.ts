import Joi from "joi";


export const FileValidation = Joi.object(
    {
        mimetype: Joi.string().required().valid("image/jpeg", "image/png").messages({
            "any.only": "only these 2 types are allowed"
        }),
        age: Joi.number().min(1.5 * 1024 * 1024).max(2 * 1024 * 1024).required().messages({
            "number.min": "minimum file size should be 1.5",
            "number.max": "maximum file size should be 2"
        })
    }
)