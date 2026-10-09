import {EmailEnum} from "../enums/email.enum.js";

export const emailTemplateConstant = {
    [EmailEnum.WELCOME]: {
        templateId: "welcome-template-id",
    },
    [EmailEnum.RESET_PASSWORD]: {
        templateId: "reset-password-template-id",
    },
    [EmailEnum.DELETE_ACCOUNT]: {
        templateId: "delete-account-template-id",
    }
}