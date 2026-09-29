import {EmailTypeEnum} from "../enums/email-type.enum.js";
import type {PickRequiredType} from "./pick-required.type.js";
import type {EmailPayloadCombinedType} from "./email-payload-combined.type.js";

export type EmailTypeToPayloadType = {
    [EmailTypeEnum.WELCOME]: PickRequiredType<EmailPayloadCombinedType, "name">
    [EmailTypeEnum.FORGOT_PASSWORD]: PickRequiredType<EmailPayloadCombinedType, "name" | "email">
    [EmailTypeEnum.OLD_VISIT]: PickRequiredType<EmailPayloadCombinedType, "name" | "email">
}