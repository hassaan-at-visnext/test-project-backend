const { db } = require('../helpers');

const User = db.User;

class UserHandler {

    static findUserByEmail(email) {
        email = email.toLowerCase();
        const user = User.findOne({ where: { email } });
        if (!user) {
            console.log(`validateUserForLogin:: User dont exists against the email. user:: ${user}`);
            throw new Exception(UserConstants.Messages.USER_DONT_EXISTS, ErrorCodes.DOCUMENT_NOT_FOUND, { reportError: true }).toJson();
        }

        return user;
    }

    static createUser({ first_name, last_name, company_name, country, email, name, password }) {
        const user = User.build({
            first_name: first_name.toLowerCase(),
            last_name: last_name.toLowerCase(),
            company_name: company_name.toLowerCase(),
            country: country.toLowerCase(),
            email: email.toLowerCase(),
            password
        });
        return user.save();
    }

    static setLoginToken(user_id, loginToken) {
        return User.update(
            {
                login_token: loginToken
            },
            {
                where: {
                    user_id
                },
                returning: "*"
            }
        );
    }

    static getAuthenticatedUser(decoded) {
        return User.findOne({
            where: { user_id: decoded.id }
        });
    }
}

module.exports = UserHandler;