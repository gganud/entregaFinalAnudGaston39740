import nodemailer from 'nodemailer';
import config from '../config/index.js';

/* class MailService
{
    static sendMail = async(payload) =>
{
        const transport = nodemailer.createTransport(config.configMail);
        return await transport.sendMail(payload);
    };
} */

class MailService
{
    static sendMail = async(payload) =>
{
        const transport = nodemailer.createTransport(config.configMail);
        return await transport.sendMail(payload);
    };
}

export default MailService;
