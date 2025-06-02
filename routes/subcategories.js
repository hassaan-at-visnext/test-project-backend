const express = require("express");
const router = express.Router();

const SubcategoriesController = require("../app/subcategories/SubcategoriesController");
const { Authentication } = require("../middlewares");
const SUBCATEGORIES_ROUTES_PREFIX = '/subcategories';

router.get(
    `${SUBCATEGORIES_ROUTES_PREFIX}/:parentId`,
    Authentication.Authenticate,
    SubcategoriesController.SubcategoriesByParentId
);

module.exports = router;