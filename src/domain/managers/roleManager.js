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
    return this.roleRepository.paginate(criteria);
  }

  async getOne(id)
{
    await idValidation.parseAsync({ id });
    return this.roleRepository.getOne(id);
  }

  async getRoleByName(roleName)
  {
    return this.roleRepository.getOne(roleName);
  }

  async create(data)
{
    await roleCreateValidation.parseAsync(data);
    return await this.roleRepository.create(data);
  }

  async updateOne(id, data)
{
    await roleUpdateValidation.parseAsync({ ...data, id });
    return this.roleRepository.updateOne(id, data);
  }

  async deleteOne(id)
{
    await idValidation.parseAsync({ id });
    return this.roleRepository.deleteOne(id);
  }
}

export default RoleManager;
