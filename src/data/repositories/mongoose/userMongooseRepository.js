import userSchema from '../../models/mongoose/userSchema.js';
import User from '../../../domain/entities/user.js';

class UserMongooseRepository
{
  async #userInfo(data)
  {
    const emptyDocument = {};
    if (!data)
    {
      return emptyDocument;
    }
    const document =
    {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: data.age,
      password: data.password,
      isAdmin: data.isAdmin,
      documents: data.documents,
      role: data.role,
      status: data.status,
      lastConnection: data.lastConnection
    };
    if (Array.isArray(data))
    {
      return data.map(document => new User(document));
    }
    return new User(document);
  }

  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const paginateOptions =
    {
        page: page || 1,
        limit: limit || 10
    };
    const userDocuments = await userSchema.paginate({}, paginateOptions);
    const { docs, ...pagination } = userDocuments;
    const users = await this.#userInfo(docs);

    return {
      users,
      pagination
    };
  }

  async getOne(id)
  {
    const userDocument = await userSchema.findOne({ _id: id });
    return this.#userInfo(userDocument);
  }

  async getOneByEmail(email)
  {
    const userDocument = await userSchema.findOne({ email });
    return this.#userInfo(userDocument);
  }

  async create(data)
  {
    const userDocument = await userSchema.create(data);
    return this.#userInfo(userDocument);
  }

  async updateOne(id, data)
  {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });
    return this.#userInfo(userDocument);
  }

  async deleteOne(id)
  {
  const userDocument = await userSchema.findOneAndUpdate({ _id: id }, { status: false }, { new: true });
  return this.#userInfo(userDocument);
  }

  async updateRolePremium(id, role)
  {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, { role }, { new: true });
    return this.#userInfo(userDocument);
  }

  async disableInactiveUsers(inactiveUsers)
  {
  const userIds = inactiveUsers.map((user) => user.id);
  const result = await userSchema.updateMany(
    { _id: { $in: userIds } },
    { $set: { status: false } }
    );
    return result.modifiedCount;
  }
}


export default UserMongooseRepository;
