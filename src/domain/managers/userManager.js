import container from '../../container.js';
import Hash from '../../shared/bcrypt.js';
import userCreateValidation from '../validations/user/userCreateValidation.js';
import userUpdateValidation from '../validations/user/userUpdateValidation.js';
import emailValidation from '../validations/user/emailValidation.js';
import idValidation from '../validations/shared/idValidation.js';
import EmailManager from './emailManager.js';
import RoleManager from './roleManager.js';

class UserManager
{
  constructor()
{
    this.userRepository = container.resolve('UserRepository');
    this.roleManager = new RoleManager();
    this.emailManager = new EmailManager();
  }

  async paginate(criteria)
{
    return this.userRepository.paginate(criteria);
  }

  async getOneByEmail(email)
{
    await emailValidation.parseAsync({ email });
    return this.userRepository.getOneByEmail(email);
  }

  async getOne(id)
{
    await idValidation.parseAsync({ id });
    return this.userRepository.getOne(id);
  }

  async create(data)
{
    await userCreateValidation.parseAsync(data);
    const dto = {
      ...data,
      password: await Hash.createHash(data.password)
    };
    const user = await this.userRepository.create(dto);
    return { ...user, password: undefined };
  }

  async updateOne(id, data)
{
    await userUpdateValidation.parseAsync({ ...data, id });
    return this.userRepository.updateOne(id, data);
  }

  async deleteOne(id)
{
    await idValidation.parseAsync({ id });
    return this.userRepository.deleteOne(id);
  }

  async forgotPassword(dto)
  {
    const user = await this.userRepository.getOneByEmail(dto.email);
    user.password = dto.password;

    return this.userRepository.updateOne(user.id, user);
  }

  async uploadDocuments(id, files)
  {
   const docToUpdate = [];
    const filesValues = Object.values(files);
    filesValues.forEach((array) =>
    {
      array.map((file) =>
      {
        const fileObject =
        {
          name: file.fieldname,
          reference: `/${file.path}`
        };
        docToUpdate.push(fileObject);
      });
    });

    await idValidation.parseAsync(id);
    return this.userRepository.updateOne(id, { documents: docToUpdate });
  }

  async setPremiumUser(id)
  {
    await idValidation.parseAsync(id);

    const [premiumRole, clientRole] = await Promise.all(
    [
      this.roleManager.getRoleByName('premium'),
      this.roleManager.getRoleByName('client')
    ]);
    if (!premiumRole || !clientRole)
    {
      throw new Error('Roles not found');
    }
    const user = await this.userRepository.getUserById(id);
    if (!user)
    {
      throw new Error('User not found');
    }

    let newRoleId;
    const documents = user.documents;
    const hasDocuments =
      documents.some((item) => item.name === 'identification') &&
      documents.some((item) => item.name === 'adressProof') &&
      documents.some((item) => item.name === 'accountStateProof');
    if (user.role.name === clientRole.name)
    {
      if (!hasDocuments)
      {
        throw new Error('Missing user documents');
      }
      newRoleId = premiumRole.id;
    }
    else
    {
      newRoleId = clientRole.id;
    }
    const userUpdated = await this.userRepository.updateUser(id, { role: newRoleId });
    return userUpdated;
  }

  async disableInactiveUsers()
  {
    try
    {
      const { users } = await this.userRepository.paginate({ paginate: false });
      const now = new Date();
      const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
      const inactiveUsers = [];
      users.forEach(async(user) =>
      {
        if (!user.isAdmin)
        {
        const lastConnectionTime = user.lastConnection instanceof Date ? user.lastConnection.getTime() : 0;
          if (now.getTime() - lastConnectionTime > twoDaysInMillis && user.status !== false)
          {
            inactiveUsers.push({ id: user.id });
            const sendMailInactive = await this.emailManager.emailInactive(user.email);
            if (!sendMailInactive)
            {
              throw new Error('Error sending mail');
            }
          }
        }
      });
      const disableUser = await this.userRepository.disableInactiveUsers(inactiveUsers);
      return disableUser;
    }
    catch (error)
    {
      throw new Error(`Failed to disable inactive users: ${error.message}`);
    }
  }
}

export default UserManager;
