const express = require("express");
const router = express.Router();

const CategoriesController = require("../app/categories/CategoriesController");
const { Authentication } = require("../middlewares");

router.get("/", Authentication.authenticate, CategoriesController.CategoriesSubcategories);

module.exports = router;