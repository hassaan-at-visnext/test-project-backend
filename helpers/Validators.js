class Validators {

  static isValidStr(str) {
    return (typeof str === 'string' && str.trim().length > 0);
  }

  static isValidateEmail(email) {
    if (!email) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  static validateCode(code, defaultCode) {
    if (code >= 400 && code < 500) {
      return code
    }
    return defaultCode;
  }
}

module.exports = Validators;