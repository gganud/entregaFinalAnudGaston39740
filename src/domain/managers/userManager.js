import container from '../../container.js';
import Hash from '../../shared/bcrypt.js';
import userCreateValidation from '../validations/user/userCreateValidation.js';
import emailValidation from '../validations/user/emailValidation.js';
import idValidation from '../validations/shared/idValidation.js';
import EmailManager from './emailManager.js';
import RoleManager from './roleManager.js';

class UserManager
{
  constructor()
  {
    this.userRepository = container.resolve('UserRepository');
    this.roleRepository = container.resolve('RoleRepository');
    this.roleManager = new RoleManager();
    this.emailManager = new EmailManager();
  }

  async paginate(criteria)
  {
    return await this.userRepository.paginate(criteria);
  }

  async getOneByEmail(email)
  {
    await emailValidation.parseAsync({ email });
    const user = await this.userRepository.getOneByEmail(email);
    if (Object.keys(user).length === 0 && user.constructor === Object)
    {
      throw new Error ('User dont exist.');
    }
    return { ...user, password: undefined };
  }

  async getOne(id)
  {
    await idValidation.parseAsync(id);
    const user = await this.userRepository.getOne(id);
    if (Object.keys(user).length === 0 && user.constructor === Object)
    {
      throw new Error ('User dont exist.');
    }
    return { ...user, password: undefined };
  }

  async create(data)
  {
    await userCreateValidation.parseAsync(data);
    const userExists = await this.userRepository.getOneByEmail(data.email);
    if (Object.keys(userExists).length !== 0)
    {
      throw new Error('User already exist');
    }

    let roleDocument = await this.roleRepository.getRoleByName(data.role);
    if (Object.keys(roleDocument).length === 0)
    {
      roleDocument = await this.roleRepository.getRoleByName('client');
    }
    const dto =
    {
      ...data,
      password: await Hash.createHash(data.password),
      role: roleDocument.id
    };
    const user = await this.userRepository.create(dto);
    return { ...user, password: undefined };
  }

  async updateOne(id, data)
  {
    const user = await this.userRepository.updateOne(id, data);
    if (Object.keys(user).length === 0 && user.constructor === Object)
    {
      throw new Error ('User dont exist.');
    }
    return { ...user, password: undefined };
  }

  async deleteOne(id)
  {
    await idValidation.parseAsync(id);
    const user = await this.userRepository.deleteOne(id);
    if (Object.keys(user).length === 0 && user.constructor === Object)
    {
      throw new Error ('User dont exist.');
    }
    return { ...user, password: undefined };
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
    const user = this.userRepository.updateOne(id, { documents: docToUpdate });
    if (Object.keys(user).length === 0 && user.constructor === Object)
    {
      throw new Error ('User dont exist.');
    }
    return { ...user, password: undefined };
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
    const user = await this.userRepository.getOne(id);
    if (Object.keys(user).length === 0 && user.constructor === Object)
    {
      throw new Error ('User dont exist.');
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
        throw new Error('Missing user documents.');
      }
      newRoleId = premiumRole.id;
    }
    else
    {
      newRoleId = clientRole.id;
    }
    const userUpdated = await this.userRepository.updateOne(id, { role: newRoleId });
    return { ...userUpdated, password: undefined };
  }

  async disableInactiveUsers()
  {
    try
    {
      const { users } = await this.userRepository.paginate();
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
            const sendMailInactive = await this.emailManager.send(user, 'mailInactiveUserTemplate.hbs', 'Usuario dado de baja por falta de actividad');
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
