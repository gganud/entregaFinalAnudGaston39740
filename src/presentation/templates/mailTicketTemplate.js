const mailTicketTemplate = (ticket) =>
{
const mailTemplate =  `<html>
                            <head>
                                <style>
                                    div {
                                    padding: 5px;
                                    color: rgb(62, 62,95)
                                    font-family 'Roboto', sans-serif;
                                    }
                                </style>
                            </head>
                            <body>
                                <div>
                                    <h2>Orden de compra.</h2>
                                    <hr />
                                    <h3 >Ticket de compra.</h3>
                                    <h5>Nº Ticket: ${ticket.code}.</h5>
                                    <h5>Fecha de compra: ${ticket.purchase_datetime}.</h5>
                                    <h5>Correo de usuario: ${ticket.purchaser}.</h5>
                                    <h5>Monto total de la compra: $${ticket.amount}.</h5>
                                    <hr />
                                    <h3>Por favor proceda al pago de la misma para finalizar su pedido.</h3>
                                    <h3>Gracias por elegirnos!</h3>
                                </div>
                            </body>
                        </html>`;

    return mailTemplate;
};

export default mailTicketTemplate;
