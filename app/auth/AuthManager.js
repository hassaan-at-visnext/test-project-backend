const { UserConstants, ErrorCodes } = require("../../constants");
const { UserHandler } = require("../../handlers");
const { Token } = require("../../helpers");
const Exception = require("../../helpers/Exceptions");
const { AuthUtil, UserUtil } = require("../../utilities");
const bcrypt = require("bcrypt");

class AuthManager {

    static async signup(data) {
        console.log(`signup:: Request to signup user. data:: ${data}`);
        AuthUtil.validateSignupRequest(data);

        let user = await UserHandler.findUserByEmail(data.email);
        AuthUtil.validateUserForSignUp(user);

        data.password = await AuthUtil.createHashedPassword(data.password);
        user = await UserHandler.createUser(data);

        user = await AuthManager.setToken(user);
        return user;
    }

    static async login(data) {
        console.log(`login:: Request to login user. data:: ${data}`);
        AuthUtil.validateLoginRequest(data);

        let user = await UserHandler.findUserByEmail(data.email);
        AuthUtil.validateUserForLogin(user);

        const PasswordMatched = await bcrypt.compare(data.password, user.password);
        if(! PasswordMatched ) {
            console.log(`login:: Password does not match.`);
            throw new Exception(UserConstants.Messages.PASSWORD_DOESNOT_MATCH, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
        }

        // AuthUtil.validatePasswordForLogin(data.password, user.password);

        user = await AuthManager.setToken(user);
        return user;      

    }

    static async setToken(user) {
        console.log(`setToken:: Setting access token of user. user:: ${user}`);

        const loginToken = Token.getLoginToken(user);

        const [_, [updatedUser]] = await UserHandler.setLoginToken(user.user_id, loginToken);

        user = UserUtil.updateUserData(updatedUser.toJSON());

        console.log(`setAccessToken:: access token of user successfully set. user:: ${user}`);

        return user;
    }

}

module.exports = AuthManager;