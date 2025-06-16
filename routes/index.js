var express = require('express');
var router = express.Router();

const authRoutes = require("./auth");
const categoryRoutes = require("./categories");
const subcategoryRoutes = require("./subcategories");
const productRoutes = require("./products");
const categoriesSubcategories = require("./categoriesSubcategories");

const AUTH_ROUTES_PREFIX = "auth";
const CATEGORY_ROUTES_PREFIX = "categories";
const SUBCATEGORY_ROUTES_PREFIX = "subcategories";
const PRODUCT_ROUTES_PREFIX = "products";
const CATEGORIES_SUBCATEGORIES_PREFIX = "categories-subcategories";

// Route prefixes centralized here
router.use(`/api/v1/${AUTH_ROUTES_PREFIX}`, authRoutes);
router.use(`/api/v1/${CATEGORY_ROUTES_PREFIX}`, categoryRoutes);
router.use(`/api/v1/${SUBCATEGORY_ROUTES_PREFIX}`, subcategoryRoutes);
router.use(`/api/v1/${PRODUCT_ROUTES_PREFIX}`, productRoutes);
router.use(`/api/v1/${CATEGORIES_SUBCATEGORIES_PREFIX}`, categoriesSubcategories);

module.exports = router;
