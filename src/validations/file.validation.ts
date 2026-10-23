import Joi from "joi";

const MAX_MIMETYPE =  ["image/jpeg", "image/png"];
const MAX_SIZE = 3 * 1024 * 1024

export const FileValidation = Joi.object(
    {
        mimetype: Joi.string().required().valid(...MAX_MIMETYPE).messages({
            "any.only": "only these 2 types are allowed"
        }),
        size: Joi.number().max(MAX_SIZE).required().messages({
            "number.max": "maximum file size should be 3"
        })
    }
).unknown(true)