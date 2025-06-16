const { SubcategoriesHandler } = require("../../handlers");

class SubcategoriesManager {

  static async SubcategoriesByParentId(parentId) {

    console.log(`subcategoriesFromParentId:: Fetching all the subcategories by parentId...`);

    return await SubcategoriesHandler.getAllSubcategoriesByParentId(parentId);
  }
}

module.exports = SubcategoriesManager;