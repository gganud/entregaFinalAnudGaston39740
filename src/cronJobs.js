import cron from 'node-cron';

import pinoLogger from './config/pinoLoggerConfig.js';
import UserManager from './domain/managers/userManager.js';

const disableInactiveUsers = async() =>
{
    const manager = new UserManager();
    try
    {
        const disableInactiveUser = await manager.disableInactiveUsers();
        pinoLogger.info(`${disableInactiveUser} users soft deleted successfully`);
    }
    catch (err)
    {
        pinoLogger.error(`Failed to soft delete inactive users: ${err.message}`);
    }
};

const disableTime = '0 0 */2 * *'; // Set 2 days
export const everyTimeDisableUsers = cron.schedule(disableTime, disableInactiveUsers);
