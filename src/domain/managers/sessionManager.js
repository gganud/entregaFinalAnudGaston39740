import container from '../../container.js';
import Hash from '../../shared/bcrypt.js';
import TokenJWT from '../../shared/token.js';
import userCreateValidation from '../validations/user/userCreateValidation.js';
import loginValidation from '../validations/session/loginValidation.js';
import idValidation from '../validations/shared/idValidation.js';
import emailValidation from '../validations/user/emailValidation.js';
import EmailManager from './emailManager.js';

class SessionManager
{
  constructor()
  {
    this.userRepository = container.resolve('UserRepository');
    this.emailManager = new EmailManager();
  }

  async login(email, password)
  {
    await loginValidation.parseAsync({ email, password });
    const user = await this.userRepository.getOneByEmail(email);
    if (!user.email)
    {
      throw new Error('User dont exist.');
    }
    const isHashedPassword = await Hash.isValidPassword(password, user.password);
    if (!isHashedPassword)
    {
      throw new Error('Login failed, invalid password.');
    }
    await this.userRepository.updateOne(user.id, { lastConnection: new Date() });
    return await TokenJWT.generate(user, '1h');
  }

  async signup(payload)
  {
    await userCreateValidation.parseAsync(payload);
    const dto = {
      ...payload,
      password: await Hash.createHash(payload.password)
    };
    const user  = await this.userRepository.create(dto);
    return { ...user, password: undefined };
  }

  async logout(id)
  {
    await idValidation.parseAsync(id);
    await this.userRepository.updateOne(id, { lastConnection: new Date() });
  }

  async forgotPassword(email)
  {
    await emailValidation.parseAsync({ email });
    const user = await this.userRepository.getOneByEmail(email);

    if (!user.email)
    {
      throw new Error('User not found');
    }
    const token = await TokenJWT.generate(user, '10m');
    const sendMail = await this.emailManager.emailPassword(token, email);
    if (!sendMail)
    {
      throw new Error('Error sending mail');
    }
  }

  async forgotchangePassword(data)
  {
    const { user } = await TokenJWT.decode(data.token);
    const { id } = await this.userRepository.getOneByEmail(user.email);
    if (data.password !== data.passwordConfirmation)
    {
      throw new Error('The passwords do not match');
    }
    const encryptedPassword = await Hash.createHash(data.passwordConfirmation);
    const result = await this.userRepository.updateOne(id, { password: encryptedPassword });
    if (!result)
    {
      throw new Error('Error updating password');
    }
    const sendMailConfirmation = await this.emailManager.emailPasswordChanged(user);
    if (!sendMailConfirmation)
    {
      throw new Error('Error sending mail');
    }
    return result;
  }

  async changePassword(data, user)
  {
    const { password } = await this.userRepository.getOneByEmail(user.email);
    const isHashedPassword = await Hash.isValidPassword(data.oldPassword, password);
    if (data.password !== data.passwordConfirmation)
    {
      throw new Error('The passwords do not match');
    }
    if (data.oldPassword === data.password)
    {
      throw new Error('The Old password its same to new Password');
    }
    if (!isHashedPassword)
    {
      throw new Error('The Old password its invalid');
    }
    const encryptedPassword = await Hash.createHash(data.passwordConfirmation);
    const result = await this.userRepository.updateOne(user.id, { password: encryptedPassword });
    if (!result)
    {
      throw new Error('Error updating password');
    }
    const sendMailConfirmation = await this.emailManager.emailPasswordChanged(user);
    if (!sendMailConfirmation)
    {
      throw new Error('Error sending mail');
    }
    return result;
  }
}

export default SessionManager;
