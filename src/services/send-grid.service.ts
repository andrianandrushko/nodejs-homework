import SendGrid from "@sendgrid/mail";
import type { MailDataRequired } from "@sendgrid/mail";
import {configs} from "../configs/user.config.js";
import {emailTemplateConstant} from "../constants/email-template.constant.js";
import type {EmailEnum} from "../enums/email.enum.js";

class SendGridService{
    constructor() {
        SendGrid.setApiKey(configs.SENDGRID_API_KEY)
    }
    public async sendByType<T extends EmailEnum>(to: string,type:T,dynamicTemplateData: any): Promise<void> {
        try {
            const templateId = emailTemplateConstant[type].templateId;
            await this.send({
                from: configs.SENDGRID_FROM_EMAIL,
                to,
                templateId,
                dynamicTemplateData,
            });
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    private async send(mailData: MailDataRequired): Promise<void> {
        await SendGrid.send(mailData);
    }
}

export const sendGridService = new SendGridService();