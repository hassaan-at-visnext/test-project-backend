const { ErrorCodes, UserConstants } = require("../../constants");
const { Validators } = require("../../helpers");
const AuthManager = require("./AuthManager");

class AuthContoller {

  static async signup(req, res) {
    try {
      const user = await AuthManager.signup(req.body);

      return res.status(ErrorCodes.CREATED).json({
        success: true,
        data: user
      });

    } catch (error) {

      console.log(`signup:: Request to sign up user failed. data:: \n${req.body}\n${error}`);

      return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
        success: false,
        message: error.reportError ? error.message : UserConstants.Messages.SIGN_UP_FAILED
      });
    }
  }

  static async login(req, res) {
    try {
      const user = await AuthManager.login(req.body);

      return res.status(ErrorCodes.SUCCESS).json({
        success: true,
        data: user.login_token,
        name: user.first_name
      });

    } catch (error) {

      console.log(`login:: Request to login user failed. data:: \n${req.body}\n${error}`);

      return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
        success: false,
        message: error.reportError ? error.message : UserConstants.Messages.LOGIN_FAILED
      });
    }
  }
}

module.exports = AuthContoller;