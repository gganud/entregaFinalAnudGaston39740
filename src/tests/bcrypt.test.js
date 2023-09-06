import chai from 'chai';

import Hash from '../shared/bcrypt.js';

const expect = chai.expect;
describe('Bcrypt test', () =>
{
  describe('createHash()', () =>
{
    it('Should return a hashed password', async() =>
{
      const hash = await Hash.createHash('password');
      expect(typeof hash).to.be.equals('string');
      expect(hash).not.to.be.a('null');
    });
  });

  describe('compareHash()', () =>
{
    it('Should return true for valid password', async() =>
{
        const hash = await Hash.createHash('password');
        const compare = await Hash.isValidPassword('password', hash);
        expect(compare).to.be.equals(true);
    });

    it('Should return false for invalid password', async() =>
{
        const hash = await Hash.createHash('password');
        const compare = await Hash.isValidPassword('invalidPassword', hash);
        expect(compare).to.be.equals(false);
    });
  });
});
