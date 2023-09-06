import MailService from '../../shared/mailService.js';
import config from '../../config/index.js';
import mailTicketTemplate from '../../presentation/templates/mailTicketTemplate.js';
import mailPayConfirmationTemplate from '../../presentation/templates/mailPayConfirmationTemplate.js';
import mailPasswordTemplate from '../../presentation/templates/mailPasswordTemplate.js';
import mailPasswordChangedTemplate from '../../presentation/templates/mailPasswordChangedTemplate.js';
import productDeletedTemplate from '../../presentation/templates/productDeletedTemplate.js';
import inactiveTemplate from '../../presentation/templates/inactiveTemplate.js';


class EmailManager
{
    async emailTicket(ticket)
    {
        const mailContent = mailTicketTemplate(ticket);
        const mail = {
            from : config.mail,
            to: ticket.purchaser,
            subject: 'Ticket de compra',
            html: mailContent
        };
        return await MailService.sendMail(mail);
    }

    async emailPayConfirmation(ticket)
    {
        const mailContent = mailPayConfirmationTemplate(ticket);
        const mail = {
            from : config.mail,
            to: ticket.purchaser,
            subject: 'Confirmacion de pago',
            html: mailContent
        };
        return await MailService.sendMail(mail);
    }

    async emailPassword(tokenPassword, email)
    {
        const mailContent = mailPasswordTemplate(tokenPassword, email);
        const mail = {
            from : config.mail,
            to: email,
            subject: 'Cambio de contraseña',
            html: mailContent
        };
        return await MailService.sendMail(mail);
    }

    async emailPasswordChanged(user)
    {
        const mailContent = mailPasswordChangedTemplate(user);
        const mail = {
            from : config.mail,
            to: user.email,
            subject: 'Contraseña cambiada exitosamente',
            html: mailContent
        };
        return await MailService.sendMail(mail);
    }

    async emailProductDeleted(email, product)
    {
        const mailContent = productDeletedTemplate(product);
        const mail = {
            from : config.mail,
            to: email,
            subject: 'Producto eliminado',
            html: mailContent
        };
        return await MailService.sendMail(mail);
    }

    async emailInactive(email)
    {
        const mailContent = inactiveTemplate(email);
        const mail = {
            from : config.mail,
            to: email,
            subject: 'Usuario dado de baja por falta de actividad',
            html: mailContent
        };
        return await MailService.sendMail(mail);
    }
}

export default EmailManager;
