const User = Object.freeze({

  Messages: {
    TOKEN_IS_MISSING_OR_INVALID: 'Token is missing or invalid',
    INAVLID_FIRST_NAME: "Invalid first name provided",
    INVALID_LAST_NAME: "Invalid last name provided",
    INVALID_COMPANY_NAME: "Invalid company name provided",
    INVALID_COUNTRY: "Invalid country provided",
    PASSWORD_DOESNOT_MATCH: 'Invalid email or password',
    INVALID_AUTHENTICATION_TOKEN: 'Invalid or expired token',
    INVALID_EMAIL: 'Invalid email provided',
    INVALID_DATA_TO_SIGNUP_USER: 'Invalid data to sign up user',
    INVALID_DATA_TO_LOGIN_USER: 'Invalid data to login user',
    INVALID_PASSWORD: 'Invalid password provided',
    USER_ALREADY_EXISTS: 'User already exist',
    USER_DONT_EXISTS: 'User dont exists',
    SIGN_UP_FAILED: 'Something went wrong while sign up. Please try again.',
    LOGIN_FAILED: 'Something went wrong while login. Please try again.',
    GET_ALL_CATEGORIES_FAILED: 'Something went wrong while getting all the categories. Please try again.',
    GET_ALL_CATEGORIES_AND_SUBCATEGORIES_FAILED: 'Something went wrong while getting all the categories. Please try again.',
    GET_PRODUCTS_BY_CATEGORY_FAILED: 'Something went wrong while getting all the products by category. Please try again',
    GET_PRODUCTS_BY_SUBCATEGORY_FAILED: 'Something went wrong while getting all the products by subcategory. Please try again',
    GET_PRODUCT_BY_ID_FAILED: 'Something went wrong while getting the product by id. Please try again.'
  }
});

module.exports = User;