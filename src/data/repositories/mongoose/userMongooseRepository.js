import userSchema from '../../models/mongoose/userSchema.js';
import User from '../../../domain/entities/user.js';
import Role from '../../../domain/entities/role.js';

class UserMongooseRepository
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const userDocuments = limit == undefined ? await userSchema.paginate({}, { page }) : await userSchema.paginate({}, { limit, page });
    const { docs, ...pagination } = userDocuments;
    const users = docs.map(document => new User({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age,
      isAdmin: document.isAdmin,
      documents: document.documents,
      role: document.role ? new Role(
          document.role.id,
          document.role.name,
          document.role.permissions
      ) : null,
      status: document.status,
      lastConnection: document.lastConnection
    }));

    return {
      users,
      pagination
    };
  }

  async getOne(id)
{
    const userDocument = await userSchema.findOne({ _id: id });
    if (!userDocument)
{
      throw new Error('User dont exist.');
    }

    return new User({
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument?.isAdmin,
        documents: userDocument?.documents,
        role: userDocument?.role ?? null,
        status: userDocument?.status,
        lastConnection: userDocument?.lastConnection
    });
  }

  async getOneByEmail(email)
{
    const userDocument = await userSchema.findOne({ email });

    return new User({
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument?.isAdmin,
        documents: userDocument?.documents,
        role: userDocument?.role ?? null,
        status: userDocument?.status,
        lastConnection: userDocument?.lastConnection
    });
  }

  async create(data)
{
    const userDocument = await userSchema.create(data);

    return new User({
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        password: userDocument.password,
        isAdmin: userDocument?.isAdmin,
        documents: userDocument?.documents,
        role: null,
        status: userDocument?.status,
        lastConnection: userDocument?.lastConnection
    });
  }

  async updateOne(id, data)
{
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User({
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        isAdmin: userDocument?.isAdmin,
        documents: userDocument?.documents,
        role: null,
        status: userDocument?.status,
        lastConnection: userDocument?.lastConnection
    });
  }


  async deleteOne(id)
  {
  const userDocument = await userSchema.findOneAndUpdate({ _id: id }, { status: false });
  if (!userDocument)
    {
      throw new Error('User dont exist.');
    }
  return new User({
    id: userDocument._id,
    firstName: userDocument.firstName,
    lastName: userDocument.lastName,
    email: userDocument.email,
    age: userDocument.age,
    isAdmin: userDocument?.isAdmin,
    documents: document.documents,
    role: userDocument.role,
    status: userDocument?.status,
    lastConnection: userDocument?.lastConnection
});
  }
  async updateRolePremium(id, role)
  {
    const userDocument = await userSchema.findOneAndUpdate({ _id: id }, { role }, { new: true });
    if (!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User({
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        isAdmin: userDocument?.isAdmin,
        documents: document.documents,
        role: userDocument.role,
        status: userDocument?.status,
        lastConnection: userDocument?.lastConnection
    });
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
