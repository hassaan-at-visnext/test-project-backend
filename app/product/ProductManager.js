const { db } = require("../../helpers");
const { Subcategory } = db;

const ProductHandler = require("../../handlers/ProductHandler");

class ProductManager {
  static async getAllProducts(page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availablity_in_us, moq, priceFrom, priceTo) {
    console.log(`search:: Fetching all the products...`);
    return await ProductHandler.getAllProducts(page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availablity_in_us, moq, priceFrom, priceTo);
  }

  static async search(categoryId, productName, page, limit, productCerts, supplierCerts, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo) {
    console.log(`search:: Fetching product by name ${productName} and category ${categoryId}`);
    return await ProductHandler.search(categoryId, productName, page, limit, productCerts, supplierCerts, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo);
  }

  static async getById(productId) {
    console.log(`getById:: Fetching products by id ${productId}`);
    return await ProductHandler.fetchById(productId);
  }

  static async getByCategory(categoryId, page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo) {
    console.log(`getByCategory:: Fetching products for category ${categoryId}`);
    return await ProductHandler.fetchByCategory(categoryId, page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo);
  }

  static async getBySubcategory(subcategoryId, page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo) {
    console.log(`getBySubcategory:: Fetching products for subcategory/type ${subcategoryId}`);

    const childSubcategories = await Subcategory.findAll({
      where: { parent_id: subcategoryId },
      attributes: ['subcategory_id']
    });

    if (childSubcategories && childSubcategories.length > 0) {
      const childIds = childSubcategories.map(c => c.subcategory_id);
      return await ProductHandler.fetchBySubcategoryAndChildren(
        subcategoryId, 
        childIds,
        page,
        limit,
        product_certifications,
        supplier_certifications,
        manufacturer_location,
        stock_availability_in_us,
        moq,
        priceFrom,
        priceTo
      );
    }

    return await ProductHandler.fetchBySubcategory(
      subcategoryId,
      page,
      limit,
      product_certifications,
      supplier_certifications,
      manufacturer_location,
      stock_availability_in_us,
      moq,
      priceFrom,
      priceTo
    );
  }
}

module.exports = ProductManager;