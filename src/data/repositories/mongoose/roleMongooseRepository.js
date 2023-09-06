import roleSchema from '../../models/mongoose/roleSchema.js';
import Role from '../../../domain/entities/role.js';

class RoleMongooseRepository
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const roleDocuments = limit == undefined ? await roleSchema.paginate({}, { page }) : await roleSchema.paginate({}, { limit, page });
    const { docs, ...pagination } = roleDocuments;

    const roles = docs.map(document => new Role({
      id: document._id,
      name: document.name,
      permissions: document.permissions
    }
    ));
    return {
      roles,
      pagination
    };
  }

  async getOne(id)
  {
    const roleDocument = await roleSchema.findOne({ _id: id });

    if (!roleDocument)
    {
      throw new Error('Role dont exist.');
    }

    return new Role({
        id: roleDocument?._id,
        name: roleDocument?.name,
        permissions: roleDocument?.permissions
    });
  }

  async getRoleByName(roleName)
  {
    const roleDocument = await roleSchema.findOne({ name: roleName });
    if (!roleDocument)
    {
      throw new Error('Role not found.');
    }

    return new Role({
      id: roleDocument?._id,
      name: roleDocument?.name,
      permissions: roleDocument?.permissions
    });
  }

  async create(data)
  {
    const roleDocument = await roleSchema.create(data);

    return new Role({
        id: roleDocument._id,
        name: roleDocument.name,
        permissions: roleDocument.permissions
    });
  }

  async updateOne(id, data)
  {
    const roleDocument = await roleSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!roleDocument)
    {
      throw new Error('Role dont exist.');
    }

    return new Role({
        id: roleDocument._id,
        name: roleDocument.name,
        permissions: roleDocument.permissions
    });
  }

  async deleteOne(id)
  {
    return roleSchema.deleteOne({ _id: id });
  }
}

export default RoleMongooseRepository;
