const { CategoriesHandler } = require("../../handlers");

class categoriesManager {
    static async search(name) {
        console.log('search:: Request to searh all categories/subcategories');
        
        return await CategoriesHandler.Search(name);
    }

    static async getAllCategories() {
        console.log(`getAllCategories:: Request to get all the categories.`);

        return await CategoriesHandler.getAllCategories();
                 
    }

    static async getAllCategoriesSubcategories() {
        console.log(`getAllCategoriesSubcategories:: Request to get all the categories.`);
        
        return await CategoriesHandler.getAllCategoriesAndSubcategories();
    }
}

module.exports = categoriesManager;