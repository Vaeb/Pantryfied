import bcrypt from 'bcryptjs';
import formatErrors from './formatErrors';

/*

    How we gonna do this:

    -args: { userKey: '...', password: '...' }
    -check whether userKey is username or email by checking for '@'
    -compare bcrypt (hashed) password
    -return jwt token to frontend (mobile) client

*/

// eslint-disable-next-line import/prefer-default-export
export const login = async ({ userKey, password }, models) => {
    try {
        const userKeyType = userKey.includes('@') ? 'email' : 'username';

        const user = await models.User.findOne({ where: { [userKeyType]: userKey } });

        const correctPass = await bcrypt.compare(password, user.password);

        if (!correctPass) {
            return {
                ok: false,
                errors: [{ path: 'password', message: 'Incorrect password' }],
            };
        }

        return {
            ok: true,
            user,
        };
    } catch (err) {
        console.log('Mutation_Login', err);
        return {
            ok: false,
            errors: formatErrors(err, models),
        };
    }
};
