const { ErrorCodes, CategoriesConstants } = require("../../constants");
const { Validators } = require("../../helpers");
const CategoriesManager = require("./CategoriesManager");

class CategoriesController {
  static async Search(req, res) {
    try {
      const result = await CategoriesManager.search(req.query.name);

      return res.status(ErrorCodes.SUCCESS).json({
        success: true,
        data: result
      });

    } catch (error) {

      console.log(`Search:: Request to search all categories failed. data:: ${error}`);

      return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
        success: false,
        message: error.reportError ? error.message : CategoriesConstants.Messages.GET_ALL_CATEGORIES_FAILED
      });
    }
  }

  static async AllCategories(req, res) {
    try {
      const categories = await CategoriesManager.getAllCategories();

      return res.status(ErrorCodes.SUCCESS).json({
        success: true,
        data: categories
      });

    } catch (error) {

      console.log(`AllCategores:: Request to get all categories failed. data:: ${error}`);

      return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
        success: false,
        message: error.reportError ? error.message : CategoriesConstants.Messages.GET_ALL_CATEGORIES_FAILED
      });
    }
  }

  static async CategoriesSubcategories(req, res) {
    try {
      const categoriesAndSubcategories = await CategoriesManager.getAllCategoriesSubcategories();

      return res.status(ErrorCodes.SUCCESS).json({
        success: true,
        data: categoriesAndSubcategories
      });

    } catch (error) {

      console.log(`CategoriesSubcategories:: Request to get all categories and subcategories failed. data:: ${error}`);

      return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
        success: false,
        message: error.reportError ? error.message : CategoriesConstants.Messages.GET_ALL_CATEGORIES_AND_SUBCATEGORIES_FAILED
      });
    }
  }

}

module.exports = CategoriesController;