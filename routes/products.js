const express = require("express");
const router = express.Router();

const ProductController = require("../app/product/ProductController");
const { Authentication } = require("../middlewares");

router.get("/all", Authentication.authenticate, ProductController.getAllProducts);

router.get("/search/:categoryId", Authentication.authenticate, ProductController.search);

router.get("/:productId", Authentication.authenticate, ProductController.getById);

router.get("/category/:categoryId", Authentication.authenticate, ProductController.getByCategory);

router.get("/subcategory/:subcategoryId", Authentication.authenticate, ProductController.getBySubcategory);

module.exports = router;
