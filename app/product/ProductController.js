const { ErrorCodes, ProductConstants } = require("../../constants");
const { Validators } = require("../../helpers");
const ProductManager = require("./ProductManager");

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const {
                page = 1,
                limit = 20,
                product_certifications,
                supplier_certifications,
                manufacturer_location,
                stock_availability_in_us,
                moq
            } = req.query;

            // Normalize product_certifications
            let productCerts = [];
            if (typeof product_certifications === 'string') {
                productCerts = product_certifications.split(',');
            } else if (Array.isArray(product_certifications)) {
                productCerts = product_certifications;
            }

            // Normalize supplier_certifications
            let supplierCerts = [];
            if (typeof supplier_certifications === 'string') {
                supplierCerts = supplier_certifications.split(',');
            } else if (Array.isArray(supplier_certifications)) {
                supplierCerts = supplier_certifications;
            }

            // Parse stock availability
            let stockAvailability = null;
            if (stock_availability_in_us === 'true') stockAvailability = true;
            else if (stock_availability_in_us === 'false') stockAvailability = false;

            // Parse MOQ - only if it's a valid integer
            let moqValue = null;
            if (moq && !isNaN(parseInt(moq)) && Number.isInteger(Number(moq))) {
                moqValue = parseInt(moq);
            }

            const result = await ProductManager.getAllProducts(
                parseInt(page),
                parseInt(limit),
                productCerts,
                supplierCerts,
                manufacturer_location,
                stockAvailability,
                moqValue
            );

            if ((!result) || result.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: "No product found",
                    data: result,
                    totalPages: 0,
                    totalItems: 0
                });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: result.data,
                page: result.pagination.page,
                limit: result.pagination.limit,
                totalPages: result.pagination.totalPages,
                totalItems: result.pagination.totalItems
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

            const products = await ProductManager.search(categoryId, productName, page, limit);

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
            const {
                page = 1,
                limit = 20,
                product_certifications,
                supplier_certifications,
                manufacturer_location,
                stock_availability_in_us,
                moq
            } = req.query;

            let productCerts = [];
            if (typeof product_certifications === 'string') {
                productCerts = product_certifications.split(',');
            } else if (Array.isArray(product_certifications)) {
                productCerts = product_certifications;
            }

            let supplierCerts = [];
            if (typeof supplier_certifications === 'string') {
                supplierCerts = supplier_certifications.split(',');
            } else if (Array.isArray(supplier_certifications)) {
                supplierCerts = supplier_certifications;
            }

            let stockAvailability = null;
            if (stock_availability_in_us === 'true') stockAvailability = true;
            else if (stock_availability_in_us === 'false') stockAvailability = false;

            // Parse MOQ - only if it's a valid integer
            let moqValue = null;
            if (moq && !isNaN(parseInt(moq)) && Number.isInteger(Number(moq))) {
                moqValue = parseInt(moq);
            }

            const result = await ProductManager.getByCategory(
                categoryId,
                parseInt(page),
                parseInt(limit),
                productCerts,
                supplierCerts,
                manufacturer_location,
                stockAvailability,
                moqValue
            );

            if ((!result) || result.data.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: "No products found for this category.",
                    data: [],
                    totalPages: 0,
                    totalItems: 0
                });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: result.data,
                page: result.pagination.page,
                limit: result.pagination.limit,
                totalPages: result.pagination.totalPages,
                totalItems: result.pagination.totalItems
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
            const {
                page = 1,
                limit = 10,
                product_certifications,
                supplier_certifications,
                manufacturer_location,
                stock_availability_in_us,
                moq
            } = req.query;

            // Normalize product_certifications
            let productCerts = [];
            if (typeof product_certifications === 'string') {
                productCerts = product_certifications.split(',');
            } else if (Array.isArray(product_certifications)) {
                productCerts = product_certifications;
            }

            // Normalize supplier_certifications
            let supplierCerts = [];
            if (typeof supplier_certifications === 'string') {
                supplierCerts = supplier_certifications.split(',');
            } else if (Array.isArray(supplier_certifications)) {
                supplierCerts = supplier_certifications;
            }

            // Parse stock availability
            let stockAvailability = null;
            if (stock_availability_in_us === 'true') stockAvailability = true;
            else if (stock_availability_in_us === 'false') stockAvailability = false;

            // Parse MOQ - only if it's a valid integer
            let moqValue = null;
            if (moq && !isNaN(parseInt(moq)) && Number.isInteger(Number(moq))) {
                moqValue = parseInt(moq);
            }

            const result = await ProductManager.getBySubcategory(
                subcategoryId,
                parseInt(page),
                parseInt(limit),
                productCerts,
                supplierCerts,
                manufacturer_location,
                stockAvailability,
                moqValue
            );

            if ((!result) || result.data.length === 0) {
                return res.status(ErrorCodes.SUCCESS).json({
                    success: true,
                    message: "No products found for this category.",
                    data: [],
                    totalPages: 0,
                    totalItems: 0
                });
            }

            return res.status(ErrorCodes.SUCCESS).json({
                success: true,
                data: result.data,
                page: result.pagination.page,
                limit: result.pagination.limit,
                totalPages: result.pagination.totalPages,
                totalItems: result.pagination.totalItems
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