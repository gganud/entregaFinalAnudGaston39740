import UserManager from '../../domain/managers/userManager.js';

class UserController
{
    static list = async(req, res, next) =>
    {
        try
        {
                const manager = new UserManager();
                const users = await manager.paginate(req.query);
                res.status(200).send({ status: 'success', payload: users });
        }
        catch (e)
        {
            next(e);
        }
    };

    static getOne = async(req, res, next) =>
    {
        try
        {
            const { id } = req.params;
            const manager = new UserManager();
            const user = await manager.getOne(id);
            res.status(200).send({ status: 'success', payload: user });
        }
        catch (e)
        {
            next(e);
        }
    };

    static getOneByEmail = async(req, res, next) =>
    {
        try
        {
            const { email } = req.body;
            const manager = new UserManager();
            const user = await manager.getOneByEmail(email);
            res.status(200).send({ status: 'success', payload: user });
        }
        catch (e)
        {
            next(e);
        }
    };

    static save = async(req, res, next) =>
    {
        try
        {
            const manager = new UserManager();
            const user = await manager.create(req.body);
            res.status(201).send({ status: 'success', payload: user, message: 'User created.' });
        }
        catch (e)
        {
            next(e);
        }
    };

    static update = async(req, res, next) =>
    {
        try
        {
            const { id } = req.params;
            const manager = new UserManager();
            const result = await manager.updateOne(id, req.body);
            res.status(201).send({ status: 'success', payload: result, message: 'User updated.' });
        }
        catch (e)
        {
            next(e);
        }
    };

    static delete = async(req, res, next) =>
    {
        try
        {
            const { id } = req.params;
            const manager = new UserManager();
            const user = await manager.deleteOne(id);
            res.status(201).send({ status: 'success', payload: user,  message: 'User deleted.' });
        }
        catch (e)
        {
            next(e);
        }
    };

    static setPremiumUser = async(req, res, next) =>
    {
        try
        {
            const manager = new UserManager();
            const user = await manager.setPremiumUser(req.params.id);
            res.status(201).send({ status: 'success', payload: user,  message: 'User updated to premium.' });
        }
        catch (e)
        {
            next(e);
        }
    };

    static uploadDocuments = async(req, res, next) =>
    {
        try
        {
            const manager = new UserManager();
            const user = await manager.uploadDocuments(req.params.id, req.files);
            if (!req.files)
            {
                return  res.status(400).send({ message: 'Your file has not been uploaded successfully' });
            }
            res.status(200).send({ status: 'success', message: 'File uploaded successfully' });
        }
        catch (e)
        {
            next(e);
        }
    };
}
export default UserController;
