const { CategoriesConstants } = require('../constants');
const Exception = require("../helpers/Exceptions");

class CategoriesUtil {
  static validateName(name) {
    if (!name) {
      console.log(`validateName:: Name not provided in query parameters:: ${name}`);
      throw new Exception(CategoriesConstants.Messages.INVALID_NAME_OF_THE_CATEGORY, { reportError: true }).toJson();
    }
  }

  static validateResult(result) {
    if ((!result?.categories || result.categories.length === 0) &&
      (!result?.subcategories || result.subcategories.length === 0)) {
      console.log(`validateResult::No category/subcategory/type found ${result}`);
      throw new Exception(CategoriesConstants.Messages.CATEGORY_SUBCATEGORY_TYPE_FOUND, { reportError: true }).toJson();
    }
  }
}

module.exports = CategoriesUtil;