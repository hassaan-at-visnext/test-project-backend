const { CategoriesHandler } = require("../../handlers");
const CategoriesUtil = require("../../utilities/CategoriesUtil");

class categoriesManager {
  static async search(name) {
    console.log('search:: Request to search all categories/subcategories');
    CategoriesUtil.validateName(name);

    const categories = await CategoriesHandler.searchCategories(name);
    const subcategories = await CategoriesHandler.searchSubcategories(name);

    const filteredCategories = categories.map(category => {
      const filteredSubcategories = category.subcategories
        ? category.subcategories.filter(sub => sub.name.toLowerCase().includes(name.toLowerCase()))
        : [];

      return {
        ...category.get({ plain: true }),
        subcategories: filteredSubcategories.map(sub => sub.get({ plain: true }))
      };
    });

    const result = {
      categories: filteredCategories,
      subcategories: subcategories.map(sc => sc.get({ plain: true }))
    };
    CategoriesUtil.validateResult(result);

    return result;
  }

  static async getAllCategories() {
    console.log(`getAllCategories:: Request to get all the categories.`);

    const categories = await CategoriesHandler.getAllCategories();

    return categories.map(category => category.get({ plain: true }));
  }

  static async getAllCategoriesSubcategories() {
    console.log(`getAllCategoriesSubcategories:: Request to get all the categories and subcategories.`);

    const categories = await CategoriesHandler.getAllCategoriesAndSubcategories();

    return categories.map(category => category.get({ plain: true }));
  }
}

module.exports = categoriesManager;