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
            const token = await manager.forgotPassword(email); // Solo devuelvo el token que se envia por mail para poder probar el ciclo sin necesidad de la vista.
            res.status(200).send({
            status: 'Success',
            token,
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
            const { token } = req.query;
            res.render('forgotPassword', { title: 'Forgot Password', token });
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
            await manager.forgotchangePassword(req.body);
            res.status(200).send({ status: 'success', message: 'Password changed successfully' });
        }
        catch (e)
        {
            next(e);
        }
    };

    static changePasswordView = async(req, res, next) =>
    {
        try
        {
            const { token } = req.query;
            res.render('resetPassword', { title: 'Change Password', token });
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
            await manager.changePassword(req.body);
            res.status(200).send({ status: 'success', message: 'Password changed successfully' });
        }
        catch (e)
        {
            next(e);
        }
    };
}
export default SessionController;
