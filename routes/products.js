const express = require("express");
const router = express.Router();

const ProductController = require("../app/product/ProductController");
const { Authentication } = require("../middlewares");

router.get("/all", Authentication.Authenticate, ProductController.getAllProducts);

router.get("/search/:categoryId", Authentication.Authenticate, ProductController.search);

router.get("/:productId", Authentication.Authenticate, ProductController.getById);

router.get("/category/:categoryId", Authentication.Authenticate, ProductController.getByCategory);

router.get("/subcategory/:subcategoryId", Authentication.Authenticate, ProductController.getBySubcategory);

module.exports = router;
