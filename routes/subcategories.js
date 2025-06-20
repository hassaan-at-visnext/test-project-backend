const express = require("express");
const router = express.Router();

const SubcategoriesController = require("../app/subcategories/SubcategoriesController");
const { Authentication } = require("../middlewares");

router.get("/:parentId", Authentication.authenticate, SubcategoriesController.SubcategoriesByParentId);

module.exports = router;
