import { Command } from 'commander';

import RoleManager from '../../domain/managers/roleManager.js';
import pinoLogger from '../../config/pinoLogger.js';

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
        permissions:
        [
          'createCart',
          'getCartByUserId',
          'addProductByCartId',
          'deleteProductInCart',
          'deleteCart',
          'updateCart',
          'updateProductByCartId',
          'checkout',
          'getUserById',
          'getUserByEmail',
          'updateUser',
          'deleteUser',
          'updateRoleUser',
          'uploadFiles',
          'readRole',
          'payOrder'
        ]
      };
      const premiumRole =
      {
        name: 'premium',
        permissions:
        [
          'createProduct',
          'updateProduct',
          'deleteProduct',
          'createCart',
          'getCartByUserId',
          'addProductByCartId',
          'deleteProductInCart',
          'deleteCart',
          'updateCart',
          'updateProductByCartId',
          'checkout',
          'getUserById',
          'getUserByEmail',
          'updateUser',
          'deleteUser',
          'updateRoleUser',
          'uploadFiles',
          'readRole',
          'payOrder'
        ]
      };
      await manager.create(clientRole);
      await manager.create(premiumRole);

      pinoLogger.info('Roles created');
    }
    catch (error)
    {
      pinoLogger.error('Error creating roles:', error.message);
    }
  });

export default createDefaultRolesCommand;
