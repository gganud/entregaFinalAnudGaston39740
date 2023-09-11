import dotenv from 'dotenv';
dotenv.config();

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    frontUrl: process.env.FRONT_URL,
    db: process.env.MONGO_DB,
    dbUri: process.env.MONGO_DB_URI,
    dbUriTests: process.env.MONGO_DB_URI2,
    privateKeyToken: process.env.PRIVATE_KEY_TOKEN,
    mail: process.env.SMTP_MAIL,
    mailKey: process.env.SMTP_KEY,
    stripeKey: process.env.STRIPE_SECRET_KEY
};

export default config;
