import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';
dotenv.config();

import config from './config/index.js';
import pinoLogger from './config/pinoLoggerConfig.js';
import DbFactory from './data/factories/dbFactory.js';
import AddUserCommand from './presentation/commands/addUserCommand.js';
import CreateDefaultRolesCommand from './presentation/commands/createDefaultRolesCommand.js';
import CreateDefaultAdminCommand from './presentation/commands/createDefaultAdminCommand.js';
import InitCommand from './presentation/commands/initCommand.js';

void (async() =>
{
  try
  {
    const db = DbFactory.create(config.db);
    db.init(config.dbUri);

    program.addCommand(CreateDefaultRolesCommand);
    program.addCommand(AddUserCommand);
    program.addCommand(CreateDefaultAdminCommand);
    program.addCommand(InitCommand);
    await program.parseAsync(process.argv);
    await db.close();
    exit();
  }
  catch (err)
  {
    await pinoLogger.error(err.stack);
    exit();
  }
})();
