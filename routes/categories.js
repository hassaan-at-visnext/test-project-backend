const express = require("express");
const router = express.Router();

const CategoriesController = require("../app/categories/CategoriesController");
const { Authentication } = require("../middlewares");

router.get("/search", Authentication.authenticate, CategoriesController.Search);

router.get("/", Authentication.authenticate, CategoriesController.AllCategories);


module.exports = router;
