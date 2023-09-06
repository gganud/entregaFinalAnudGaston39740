const mailPayConfirmationTemplate = (ticket) =>
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
                                    <h2>Felicitaciones hemos recibido el pago de su orden ${ticket.code}!!!</h2>
                                    <hr />
                                    <h3>El detalle de su compra es:</h3>
                                    <h5>Fecha de compra: ${ticket.purchase_datetime}.</h5>
                                    <h5>Correo de usuario: ${ticket.purchaser}.</h5>
                                    <h5>Monto total de la compra: $${ticket.amount}.</h5>
                                    <h5>Fecha de pago: $${ticket.orderCompleted_datetime}.</h5>
                                    <hr />
                                    <h3>En breve nos comunicaremos por este medio para coordinar el envío de la misma.</h3>
                                </div>
                            </body>
                        </html>`;

    return mailTemplate;
};

export default mailPayConfirmationTemplate;
