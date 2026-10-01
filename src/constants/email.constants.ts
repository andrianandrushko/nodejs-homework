import {EmailTypeEnum} from "../enums/email-type.enum.js";

export const EmailConstants = {
    [EmailTypeEnum.WELCOME]: {
        subject: 'welcome',
        template: 'welcome'
    },
    [EmailTypeEnum.FORGOT_PASSWORD]: {
        subject: 'forgot-password',
        template: 'forgot-password'
    },
    [EmailTypeEnum.OLD_VISIT]: {
        subject: 'old-visit',
        template: 'old-visit'
    },
    [EmailTypeEnum.LOGOUT_ALL]: {
        subject: 'logout-all',
        template: 'logout-all'
    }
}