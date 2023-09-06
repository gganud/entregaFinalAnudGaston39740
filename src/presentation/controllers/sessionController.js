import SessionManager from '../../domain/managers/sessionManager.js';

class SessionController
{
    static login = async(req, res, next) =>
    {
        try
        {
            const { email, password } = req.body;
            const manager = new SessionManager();
            const accessToken = await manager.login(email, password);
            res.cookie('accessToken', accessToken,
            {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).status(200).send({ accessToken, message: `Login success!, user: ${email}.` });
        }
        catch (e)
        {
            next(e);
        }
    };

    static logout = async(req, res, next) =>
    {
        try
        {
            const manager = new SessionManager();
            await manager.logout(req.user.id);
            res.clearCookie('accessToken');
            res.user = null;
            return res.status(200).send({ status: 'success', message: 'Logout success!' });
        }
        catch (e)
        {
          next(e);
        }
      };

    static current = async(req, res, next) =>
    {
        try
        {
            res.status(200).send({ status: 'Success', payload: req.user });
        }
        catch (e)
        {
           next(e);
        }
    };

    static signup = async(req, res, next) =>
    {
        try
        {
            const manager = new SessionManager();
            const user = await manager.signup(req.body);
            res.status(201).send({ status: 'success', user, message: 'Signup success.' });
        }
        catch (e)
        {
            next(e);
        }
    };

    static forgotPasswordMail = async(req, res, next) =>
    {
        try
        {
            const { email } = req.body;
            const manager = new SessionManager();
            await manager.forgotPassword(email);
            res.status(200).send({
            status: 'Success',
            message: 'Mail sent successfully. Please check your email to reset your password'
            });
        }
        catch (e)
        {
            next(e);
        }
    };

    static forgotPasswordView = async(req, res, next) =>
    {
        try
        {
            const { token, email } = req.params;
            res.render('forgotPassword', { title: 'Forgot Password', token, email });
        }
        catch (e)
        {
            next(e);
        }
    };

    static forgotNewPassword = async(req, res, next) =>
    {
        try
        {
            const manager = new SessionManager();
            const user = await manager.forgotchangePassword(req.body);
            res.status(200).send({ status: 'success', message: 'Password changed successfully' });
        }
        catch (e)
        {
            next(e);
        }
    };

    static changePassword = async(req, res, next) =>
    {
        try
        {
            const manager = new SessionManager();
            await manager.changePassword(req.body, req.user);
            res.status(200).send({ status: 'success', message: 'Password changed successfully' });
        }
        catch (e)
        {
            next(e);
        }
    };
}
export default SessionController;
