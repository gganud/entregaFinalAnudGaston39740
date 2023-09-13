import roleSchema from '../../models/mongoose/roleSchema.js';
import Role from '../../../domain/entities/role.js';

class RoleMongooseRepository
{
  #roleInfo(data)
    {
        const emptyDocument = {};
        if (!data)
        {
            return emptyDocument;
        }
        const document = {
          id: data._id,
          name: data.name,
          permissions: data.permissions
        };
        if (Array.isArray(data))
        {
            return data.map(document => new Role(document));
        }
        return new Role (document);
    }

  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const paginateOptions =
    {
      page: page || 1,
      limit: limit || 10
    };
    const roleDocuments = await roleSchema.paginate({}, paginateOptions);
    const { docs, ...pagination } = roleDocuments;

    const roles = this.#roleInfo(docs);
    return {
      roles,
      pagination
    };
  }

  async getOne(id)
  {
    const roleDocument = await roleSchema.findOne({ _id: id });
    return this.#roleInfo(roleDocument);
  }

  async getRoleByName(roleName)
  {
    const roleDocument = await roleSchema.findOne({ name: roleName });
    return this.#roleInfo(roleDocument);
  }

  async create(data)
  {
    const roleDocument = await roleSchema.create(data);

    return this.#roleInfo(roleDocument);
  }

  async updateOne(id, data)
  {
    const roleDocument = await roleSchema.findOneAndUpdate({ _id: id }, data, { new: true });
    return this.#roleInfo(roleDocument);
  }

  async deleteOne(id)
  {
    const roleDocument = await roleSchema.findOneAndUpdate({ _id: id }, { enable: false });
    return this.#roleInfo(roleDocument);
  }
}

export default RoleMongooseRepository;
