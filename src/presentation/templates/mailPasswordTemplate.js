import config from '../../config/index.js';

const mailPasswordTemplate = (tokenPassword, email) =>
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
                                <h1>Ingresa a este link para cambiar tu contraseña</h1>
                                <a href="http://localhost:${config.port}/api/sessions/resetPassword/${tokenPassword}/${email}"><h2>Hacé click aquí</h2></a>
                            </div>
                        </body>
                </html>`;
    return mail;
};
export default mailPasswordTemplate;

