const express = require("express");
const router = express.Router();

const { Authentication } = require("../middlewares");
const ProductController = require("../app/product/ProductController");
const PRODUCTS_ROUTES_PREFIX = '/products';

router.get(
    `${PRODUCTS_ROUTES_PREFIX}/search/:categoryId`,
    Authentication.Authenticate,
    ProductController.search
);

router.get(
    `${PRODUCTS_ROUTES_PREFIX}/:productId`,
    Authentication.Authenticate,
    ProductController.getById
);

router.get(
    `${PRODUCTS_ROUTES_PREFIX}/category/:categoryId`,
    Authentication.Authenticate,
    ProductController.getByCategory
);

router.get(
    `${PRODUCTS_ROUTES_PREFIX}/subcategory/:subcategoryId`,
    Authentication.Authenticate,
    ProductController.getBySubcategory
);

module.exports = router;