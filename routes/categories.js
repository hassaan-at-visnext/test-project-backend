const express = require("express");
const router = express.Router();

const CategoriesController = require("../app/categories/CategoriesController");
const { Authentication } = require("../middlewares");

router.get("/search", Authentication.Authenticate, CategoriesController.Search);

router.get("/", Authentication.Authenticate, CategoriesController.AllCategories);

// router.get("-subcategories", Authentication.Authenticate, CategoriesController.CategoriesSubcategories);

module.exports = router;
