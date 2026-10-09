import nodemailer, { type Transporter } from "nodemailer";
import * as path from "node:path";
import hbs from "nodemailer-express-handlebars";
import {configs} from "../configs/user.config.js";
import type {EmailTypeEnum} from "../enums/email-type.enum.js";
import {EmailConstants} from "../constants/email.constants.js";
import type {EmailTypeToPayloadType} from "../types/email.type-to-payload.type.js";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
        const templatePath = path.join(__dirname, '..', 'templates')
        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                partialsDir: path.join(templatePath, "./partials"),
                layoutsDir: path.join(templatePath, "./layouts"),
            },
            viewPath: path.join(templatePath, "./views"),
            extName: '.hbs'
        };
        this.transporter.use('compile', hbs(hbsOptions))
    }

    public async sendEmail<T extends EmailTypeEnum>(type: T,to: string, context: EmailTypeToPayloadType[T]): Promise<void> {
        const { subject, template } = EmailConstants[type]
        const option =  {
          to,
          subject,
          template,
          context
        }
        await this.transporter.sendMail(option)
    }
}

export const emailService = new EmailService()