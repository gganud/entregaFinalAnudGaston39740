import { Command } from 'commander';

import addUserCommand from './addUserCommand.js';
import pinoLogger from '../../config/pinoLoggerConfig.js';

const createDefaultAdminCommand = new Command('createDefaultAdmin');

createDefaultAdminCommand
  .version('1.0.0')
  .description('Create default admin user')
  .option('-e, --email <email>', 'User email')
  .option('-p, --password <password>', 'User password')
  .action(async(options) =>
  {
    try
    {
      if (!options.email)
      {
        options.email = 'admin@domain.com';
      }
      if (!options.password)
      {
        options.password = 'admin';
      }
      const userArgs = [
        '--',
        'addUser',
        '--email',
        options.email,
        '--password',
        options.password,
        '--firstName',
        'Admin',
        '--lastName',
        'User',
        '--age',
        18,
        '--isAdmin',
        true
      ];
      const p = await addUserCommand.parseAsync(userArgs);
    }
    catch (e)
    {
      pinoLogger.error('Error creating admin user:', e.message);
    }
  });

export default createDefaultAdminCommand;
