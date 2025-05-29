const express = require("express");
const router = express.Router();

const CategoriesController = require("../app/categories/CategoriesController");
const { Authentication } = require("../middlewares");
const CATEGORIES_ROUTES_PREFIX = '/categories';

router.get(
    `${CATEGORIES_ROUTES_PREFIX}/search`,
    Authentication.Authenticate,
    CategoriesController.Search
);

router.get(
    `${CATEGORIES_ROUTES_PREFIX}`,
    Authentication.Authenticate,
    CategoriesController.AllCategories
);

router.get(
    `${CATEGORIES_ROUTES_PREFIX}-subcategories`,
    Authentication.Authenticate,
    CategoriesController.CategoriesSubcategories
);

module.exports = router;