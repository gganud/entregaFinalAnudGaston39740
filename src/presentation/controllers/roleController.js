import RoleManager from '../../domain/managers/roleManager.js';

class RoleController
{
    static list = async(req, res, next) =>
{
        try
{
            const { limit, page } = req.query;
            const manager = new RoleManager();
            const roles = await manager.paginate({ limit, page });
            res.status(200).send({ status: 'success', roles: roles.docs, ...roles, docs: undefined });
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
            const manager = new RoleManager();
            const role = await manager.getOne(id);
            res.status(200).send({ status: 'success', role });
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
            const manager = new RoleManager();
            const role = await manager.create(req.body);
            res.status(201).send({ status: 'success', role, message: 'Role created.' });
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
            const manager = new RoleManager();
            const result = await manager.updateOne(id, req.body);
            res.status(201).send({ status: 'success', result, message: 'Role updated.' });
        }
        catch (e)
{
            next(e);
        }
    };

    static deleteOne = async(req, res, next) =>
{
        try
{
            const { id } = req.params;
            const manager = new RoleManager();
            await manager.deleteOne(id);
            res.status(201).send({ status: 'success', message: 'Role deleted.' });
        }
        catch (e)
{
            next(e);
        }
    };
}

export default RoleController;
