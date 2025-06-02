const { ErrorCodes, ProductConstants } = require("../../constants");
const { Validators } = require("../../helpers");
const ProductManager = require("./ProductManager");

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const { page = 1, limit = 20} = req.query;

            const products = await ProductManager.getAllProducts(page, limit);

            if((!products) || products.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: "No product found",
                    data: products
                });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: products
            });
            
        } catch (error) {
             console.log(`getAllProducts:: request to get all product failed. data:: ${error}`);

            return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
                success: false,
                message: error.reportError ? error.message : ProductConstants.Messages.GET_ALL_PRODUCTS_FAILED
            });
        }
    }

    static async search(req, res) {
        try {
            const { productName, page = 1, limit = 10 } = req.query;
            const { categoryId } = req.params;

            const products = await ProductManager.search( categoryId, productName, page, limit );

            if ((!products) || products.length === 0) {
                 return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                message: "No product found",
                data: products
            });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: products
            });
        } catch (error) {

            console.log(`search:: request to search the product failed. data:: ${error}`);

            return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
                success: false,
                message: error.reportError ? error.message : ProductConstants.Messages.PRODUCT_SEARCH_FAILED
            });
        }
    }

    static async getById(req, res) {
        try {
            const { productId } = req.params;

            const product = await ProductManager.getById(productId);

            if ((!product) || product.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: "No Product found"
                });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: product
            });

        } catch (error) {

            console.log(`getById:: request to get all products by id failed. data:: ${error}`);

            return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
                success: false,
                message: error.reportError ? error.message : ProductConstants.Messages.GET_PRODUCT_BY_ID_FAILED
            });
        }
    }

    static async getByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const { page = 1, limit = 20 } = req.query;

            const products = await ProductManager.getByCategory(categoryId, page, limit);

            if (products.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: "No products found for this category.",
                    data: []
                });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: products
            });

        } catch (error) {

            console.log(`getByCategory:: Request to get all products by categories failed. data:: ${error}`);

            return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
                success: false,
                message: error.reportError ? error.message : ProductConstants.Messages.GET_PRODUCTS_BY_CATEGORY_FAILED
            });
        }
    }

    static async getBySubcategory(req, res) {
        try {
            const { subcategoryId } = req.params;
            const { page = 1, limit = 10 } = req.query;

            const products = await ProductManager.getBySubcategory(subcategoryId, page, limit);

            if (products.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: "No products found for this category.",
                    data: []
                });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: products
            });

        } catch (error) {

            console.log(`getBySubcategory:: Request to get all Products by subcategories failed. data:: ${error}`);

            return res.status(Validators.validateCode(error.code, ErrorCodes.INTERNAL_SERVER_ERROR)).json({
                success: false,
                message: error.reportError ? error.message : ProductConstants.Messages.GET_PRODUCTS_BY_SUBCATEGORY_FAILED
            });
        }
    }
}

module.exports = ProductController;