import { Command } from 'commander';

import addUserCommand from './addUserCommand.js';
import pinoLogger from '../../config/pinoLogger.js';

const createDefaultAdminCommand = new Command('createDefaultAdmin');

createDefaultAdminCommand
  .version('1.0.0')
  .description('Create default admin user')
  .option('-e, --email <email>', 'User email')
  .option('-p, --password <password>', 'User password')
  .action(async(options) =>
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
      'add-user',
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
    try
    {
      await addUserCommand.parseAsync(userArgs);
    }
    catch (err)
    {
      pinoLogger.error('Error creating admin user:', err.message);
    }
  });

export default createDefaultAdminCommand;
