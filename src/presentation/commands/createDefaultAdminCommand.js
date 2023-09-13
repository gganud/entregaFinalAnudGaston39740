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
        options.email = 'admin@admin.com';
      }
      if (!options.password)
      {
        options.password = '12345678';
      }
      const userArgs = [
        '--',
        'addUser',
        '-e',
        options.email,
        '-fn',
        'admin',
        '-ln',
        'admin',
        '-p',
        options.password,
        '-a',
        33,
        '-ia',
        'true'
      ];
      await addUserCommand.parseAsync(userArgs);
    }
    catch (e)
    {
      pinoLogger.error('Error creating admin user:', e.message);
    }
  });

export default createDefaultAdminCommand;
