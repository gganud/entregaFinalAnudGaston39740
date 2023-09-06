import config from '../../config/index.js';

const mailPasswordChangedTemplate = (user) =>
{
    const mail = `<html>
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
                                <h1>Confirmacion de cambio de contraseña exitoso</h1>
                                <h3>Felicitaciones ${user.firstName} usted ha actualizado la contraseña del usuario ${user.email} correctamente.</h3>
                            </div>
                        </body>
                </html>`;
    return mail;
};
export default mailPasswordChangedTemplate;

