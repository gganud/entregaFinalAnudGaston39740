import container from '../../container.js';
import roleCreateValidation from '../validations/role/roleCreateValidation.js';
import roleUpdateValidation from '../validations/role/roleUpdateValidation.js';
import idValidation from '../validations/shared/idValidation.js';

class RoleManager
{
  constructor()
{
    this.roleRepository = container.resolve('RoleRepository');
  }

  async paginate(criteria)
{
  return await this.roleRepository.paginate(criteria);
  }

  async getOne(id)
{
  await idValidation.parseAsync(id);
    const role = await this.roleRepository.getOne(id);
    if (Object.keys(role).length === 0 && role.constructor === Object)
        {
          throw new Error ('Role dont exist.');
        }
    return role;
  }

  async getRoleByName(roleName)
  {
    const role = await this.roleRepository.getRoleByName(roleName);
    if (Object.keys(role).length === 0 && role.constructor === Object)
        {
            throw new Error ('Role dont exist.');
        }
    return role;
  }

  async create(data)
{
    await roleCreateValidation.parseAsync(data);
    return await this.roleRepository.create(data);
  }

  async updateOne(id, data)
{
    await roleUpdateValidation.parseAsync({ ...data, id });
    const role = await this.roleRepository.updateOne(id, data);
    if (Object.keys(role).length === 0 && role.constructor === Object)
        {
            throw new Error ('Role dont exist.');
        }
    return role;
  }

  async deleteOne(id)
{
    await idValidation.parseAsync(id);
    const role = await this.roleRepository.deleteOne(id);
    if (Object.keys(role).length === 0 && role.constructor === Object)
        {
            throw new Error ('Role dont exist.');
        }
    return role;
  }
}

export default RoleManager;
