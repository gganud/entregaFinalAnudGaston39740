import nodemailer from 'nodemailer';
import config from '../../config/index.js';
import { resolve } from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

class EmailManager
{
    constructor()
    {
        this.templatesEngine = Handlebars;
        /* this.smtp_config = { // Mail Gmail
            service: 'gmail',
            port: 587,
            auth: {
            user: config.mail,
            pass: config.mailKey
            },
            secure: false
        }; */
        this.smtp_config = { // mailHog
            host: 'mail',
            port: 1025
        };
    }

    async send(data, templateFile, subject)
    {
        const transport = nodemailer.createTransport(this.smtp_config);
        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = this.templatesEngine.compile(source);
        const html = template(data);
        const mailoptions = {
            from : config.mail,
            to: data.email,
            subject,
            html
        };
        return await transport.sendMail(mailoptions);
    }
}

export default EmailManager;
