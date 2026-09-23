import { ApiError } from "../errors/api.error.js";
import { type NextFunction, type Request, type Response } from "express";
import {
    UserBodyValidation,
    UserParamsValidation,
    UserQueryValidation,
} from "../validations/user.validation.js";

class UserValidateMiddleware {
    public validateBody() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error } = UserBodyValidation.validate(req.body);
                if (error) {
                    throw new ApiError(error.message, 400);
                }
                next();
            } catch (err) {
                next(err);
            }
        };
    }
    public validateQuery() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error } = UserQueryValidation.validate(req.query);
                if (error) {
                    throw new ApiError(error.message, 400);
                }
                next()
            }catch (err) {
                next(err)
            }
        }
    }
    public validateParams() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error } = UserParamsValidation.validate(req.params);
                if (error) {
                    throw new ApiError(error.message, 400);
                }
                next()
            }catch (err) {
                next(err)
            }
        }
    }
}

export const userValidateMiddleware = new UserValidateMiddleware();