const { ErrorCodes, UserConstants } = require("../constants");
const { UserHandler } = require("../handlers");
const { Validators, Token, config } = require("../helpers");
const Exception = require("../helpers/Exceptions");

class Authentication {
  static async authenticate(req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token || (!Validators.isValidStr(token))) {
        console.log('authentication:: Token is not provided');
        throw new Exception(UserConstants.Messages.TOKEN_IS_MISSING_OR_INVALID, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
      }

      const decoded = Token.verifyToken(token, config.secretKey);
      if (!decoded) {
        console.log(`authenticate:: Token is invalid or expired. token:: ${token}`);
        throw new Exception(UserConstants.Messages.INVALID_AUTHENTICATION_TOKEN, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
      }

      const user = await UserHandler.getAuthenticatedUser(decoded);
      if (!user) {
        console.log(`authentication:: Token is invalid, no user found. token:: ${token}`);
        throw new Exception(UserConstants.Messages.INVALID_AUTHENTICATION_TOKEN, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
      }

      req.user = user;

      next();

    } catch (error) {
      console.log(`authentication:: authorization failed. error:: ${error.message}`);

      return res.status(error.code || 500).json({
        success: false,
        message: error.message || 'Authorization failed',
      });
    }
  }
}

module.exports = Authentication;