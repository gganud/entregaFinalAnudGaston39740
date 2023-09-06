import bcrypt from 'bcrypt';

class Hash
{
    static createHash = async(password) =>
{
    return await bcrypt.hash(password, 10);
    };

    static isValidPassword = async(password, passwordHash) =>
{
        return await bcrypt.compare(password, passwordHash);
    };
}

export default Hash;
