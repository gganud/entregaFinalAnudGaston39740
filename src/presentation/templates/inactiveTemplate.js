const inactiveTemplate = (email) =>
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
                                    <h2>Tu cuenta registrada con el mail: ${email} ha sido eliminada por inactividad</h2>
                                </div>
                            </body>
                        </html>`;

    return mailTemplate;
};

export default inactiveTemplate;
