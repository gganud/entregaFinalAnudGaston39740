import jwt from 'jsonwebtoken';
import config from '../config/index.js';
class TokenJWT
{
    static generate = async(user, time) =>
    {
        return await jwt.sign({ user: { ...user, password: undefined } }, config.privateKeyToken, { expiresIn: `${time}` });
    };

    static decode = async(token) =>
    {
        return await jwt.verify(token, config.privateKeyToken);
    };
}

export default TokenJWT;
