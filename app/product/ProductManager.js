const ProductHandler = require("../../handlers/ProductHandler");

class ProductManager {
    static async getAllProducts(page, limit) {
        console.log(`search:: Fetching all the products...`);
        return await ProductHandler.getAllProducts(page, limit);        
    }

    static async search( categoryId, productName, page, limit ){
        console.log(`seach:: Fetching product by name ${productName} and category ${categoryId} `);
        return await ProductHandler.search(categoryId, productName, page, limit);
    }

    static async getById(productId){
        console.log(`getById:: Fetching products by id ${productId}`);
        return await ProductHandler.fetchById(productId);
    }

    static async getByCategory(categoryId, page, limit){
        console.log(`getByCategory:: Fetching products for category ${categoryId}`);
        return await ProductHandler.fetchByCategory(categoryId, page, limit);
    }

    static async getBySubcategory(subcategoryId, page, limit){
        console.log(`getBySubcategory:: Fetching products for subcategory/type ${subcategoryId}`);
        return await ProductHandler.fetchBySubcategory(subcategoryId, page, limit);
    }
}

module.exports = ProductManager;