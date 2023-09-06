const productDeletedTemplate = (product) =>
{
const mailTemplate =  `<html>
                            <head>
                                <style>
                                    div {
                                    padding: 5px;
                                    color: rgb(62, 62,95)
                                    font-family 'Roboto', sans-serif;
                                    background-image: url('');
                                    }
                                </style>
                            </head>
                            <body>
                                <div>
                                    <h1>Producto eliminado</h1>
                                    <h2>Titulo: ${product.title}</h2>
                                </div>
                            </body>
                        </html>`;

    return mailTemplate;
};

export default productDeletedTemplate;
