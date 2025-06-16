const { UserConstants, ErrorCodes } = require('../constants');
const { Validators, bcrypt } = require('../helpers');
const Exception = require('../helpers/Exceptions');
const CryptoJS = require('crypto-js');

class AuthUtil {

  static validateSignupRequest(data) {
    if (!data) {
      console.log(`validateSignupRequest:: Invalid data to sign up user. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_DATA_TO_SIGNUP_USER, { reportError: true }).toJson();
    }

    if (!Validators.isValidStr(data.first_name)) {
      console.log(`validateSignUpRequest:: first_name is not valid. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INAVLID_FIRST_NAME, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (!Validators.isValidStr(data.last_name)) {
      console.log(`validatesSignUpRequest:: last_name is not valid. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_LAST_NAME, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (!Validators.isValidStr(data.company_name)) {
      console.log(`validatesSigupRequest:: company_name is not valid. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_COMPANY_NAME, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (!Validators.isValidStr(data.country)) {
      console.log(`validatesSigupRequest:: company_name is not valid. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_COUNTRY, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (!Validators.isValidateEmail(data.email)) {
      console.log(`validateSignUpRequest:: Email is not valid. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (!Validators.isValidStr(data.password)) {
      console.log(`validateSignUpRequest:: Password is not valid. datat:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_PASSWORD, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }
  }

  static validateLoginRequest(data) {
    if (!data) {
      console.log(`validateLogInRequest:: Invalid data to Login user. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_DATA_TO_LOGIN_USER, { reportError: true }).toJson();
    }

    if (!Validators.isValidateEmail(data.email)) {
      console.log(`validateLogInRequest:: Email is not valid. data:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }

    if (!Validators.isValidStr(data.password)) {
      console.log(`validateLogInRequest:: Password is not valid. datat:: ${data}`);
      throw new Exception(UserConstants.Messages.INVALID_PASSWORD, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();
    }
  }

  static validateUserForSignUp(user) {
    if (user) {
      console.log(`validateUserForSignUp:: User already exists against the email. user:: ${user}`);
      throw new Exception(UserConstants.Messages.USER_ALREADY_EXISTS, ErrorCodes.CONFLICK_WITH_CURRENT_STATE, { reportError: true }).toJson();
    }
  }

  static validateUserForLogin(user) {
    if (!user) {
      console.log(`validateUserForLogin:: User dont exists against the email. user:: ${user}`);
      throw new Exception(UserConstants.Messages.USER_DONT_EXISTS, ErrorCodes.DOCUMENT_NOT_FOUND, { reportError: true }).toJson();
    }
  }

  static async createHashedPassword(password) {
    password = await bcrypt.hash(password, 10);
    return password;
  }

  static async validatePasswordForLogin(reqPassword, dbPassword) {
    const PasswordMatched = await bcrypt.compare(reqPassword, dbPassword);
    if (!PasswordMatched) {
      console.log(`login:: Password does not match.`);
      throw new Exception(UserConstants.Messages.PASSWORD_DOESNOT_MATCH, ErrorCodes.UNAUTHORIZED, { reportError: true }).toJson();
    }
  }

  static decryptPassword(encryptedPassword) {
    const secretKey = 'my-secret-key';

    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    return originalPassword;
  }

  static deletePasswordFromUser(user) {
    if (user?.password) {
      user.password = undefined;
      return user;
    }
    return user;
  }
}

module.exports = AuthUtil;