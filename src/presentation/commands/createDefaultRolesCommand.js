import { Command } from 'commander';

import RoleManager from '../../domain/managers/roleManager.js';
import pinoLogger from '../../config/pinoLoggerConfig.js';
import { defaultRoles } from '../../config/index.js';

const createDefaultRolesCommand = new Command('createDefaultRoles')
  .version('1.0.0')
  .description('Create default roles')
  .action(async() =>
  {
    try
    {
      const manager = new RoleManager();

      const clientRole =
      {
        name: 'client',
        permissions: defaultRoles.client
      };
      const premiumRole =
      {
        name: 'premium',
        permissions: defaultRoles.premium
      };
      await manager.create(clientRole);
      await manager.create(premiumRole);
      pinoLogger.info('Roles created');
    }
    catch (e)
    {
      pinoLogger.error('Error creating roles:', e.message);
    }
  });

export default createDefaultRolesCommand;
