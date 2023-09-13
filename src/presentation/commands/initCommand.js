import { Command } from 'commander';

import CreateDefaultRolesCommand from './createDefaultRolesCommand.js';
import CreateDefaultAdminCommand from './createDefaultAdminCommand.js';
import pinoLogger from '../../config/pinoLoggerConfig.js';


const initCommand = new Command('init');

initCommand
.version('1.0.0')
.description('Initialize the application')
.action(async() =>
{
  try
  {
    const roleArgs = ['--', 'createDefaultRoles'];
    const adminArgs = ['--', 'addUser'];
    await CreateDefaultRolesCommand.parseAsync(roleArgs);
    await CreateDefaultAdminCommand.parseAsync(adminArgs);
    pinoLogger.info('Initialization complete');
    pinoLogger.info('Admin user: admin@admin.com');
    pinoLogger.info('Admin password: 12345678');
  }
  catch (error)
  {
    pinoLogger.error('Initialization error:', error.message);
  }
  finally
  {
    process.exit(0);
  }
});

export default initCommand;
