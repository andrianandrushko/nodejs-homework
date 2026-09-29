import nodemailer, { type Transporter } from "nodemailer";
import * as path from "node:path";
import hbs from "nodemailer-express-handlebars";
import {configs} from "../configs/user.config.js";
import type {EmailTypeEnum} from "../enums/email-type.enum.js";
import {EmailConstants} from "../constants/email.constants.js";
import type {EmailTypeToPayloadType} from "../types/email.type-to-payload.type.js";

class EmailService{
    private transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configs.SMTP_EMAIL,
                pass: configs.SMTP_PASSWORD,
            }
        })

        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                partialsDir: path.join(process.cwd(), 'src', 'templates', "./partials"),
                layoutsDir: path.join(process.cwd(), 'src', 'templates', "./layouts"),
            },
            viewPath: path.join(process.cwd(), 'src', 'templates', "./views"),
            extName: '.hbs'
        };
        this.transporter.use('compile', hbs(hbsOptions))
    }

    public async sendEmail<T extends EmailTypeEnum>(type: T,to: string, context: EmailTypeToPayloadType[T]): Promise<void> {
        const { subject, template } = EmailConstants[type]
        const option =  {
          to,
          subject: 'test email',
          html: 'this is a test email',
          template,
          context
        }
        await this.transporter.sendMail(option)
    }
}

export const emailService = new EmailService()