import {EmailTypeEnum} from "../enums/email-type.enum.js";
import type {PickRequiredType} from "./pick-required.type.js";
import type {EmailPayloadCombinedType} from "./email-payload-combined.type.js";
import {EmailEnum} from "../enums/email.enum.js";

export type EmailTypeToPayloadType = {
    [EmailTypeEnum.WELCOME]: PickRequiredType<EmailPayloadCombinedType, "name">
    [EmailTypeEnum.FORGOT_PASSWORD]: PickRequiredType<EmailPayloadCombinedType, "name" | "email" | "actionToken">
    [EmailTypeEnum.OLD_VISIT]: PickRequiredType<EmailPayloadCombinedType, "name" | "email">
    [EmailTypeEnum.LOGOUT_ALL]: PickRequiredType<EmailPayloadCombinedType, "name">

    [EmailEnum.WELCOME]: PickRequiredType<EmailPayloadCombinedType, "name" | "frontendUrl" | "actionToken">
    [EmailEnum.RESET_PASSWORD]: PickRequiredType<EmailPayloadCombinedType, "frontendUrl" | "actionToken">
    [EmailEnum.DELETE_ACCOUNT]: PickRequiredType<EmailPayloadCombinedType, "frontendUrl">
}