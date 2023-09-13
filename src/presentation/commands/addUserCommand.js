import { Command } from 'commander';

import UserManager from '../../domain/managers/userManager.js';
import pinoLogger from '../../config/pinoLoggerConfig.js';

const AddUserCommand = new Command('addUser');

AddUserCommand
  .version('1.0.0')
  .description('Add new user')
  .option('-e, --email <email>', 'User`s email')
  .option('-p, --password <password>', 'User`s password')
  .option('-fn, --firstName <firstName>', 'User`s first name')
  .option('-ln, --lastName <lastName>', 'User`s last name')
  .option('-a, --age <age>', 'User`s age')
  .option('-ia, --isAdmin <isAdmin>', 'User`s isAdmin')
  .action(async(env) =>
  {
    const payload =
    {
      ...env,
      age: +env.age,
      isAdmin: env.isAdmin === 'true'
    };

    const manager = new UserManager();
    const user = await manager.create(payload);
    if (user)
    {
      pinoLogger.info(`User created successfully - User: ${user.email}`);
    }
  });

export default AddUserCommand;
