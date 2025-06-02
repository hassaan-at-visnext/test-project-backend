var express = require('express');
var router = express.Router();
const auth = require("./auth");
const categories = require("./categories");
const subcategories = require("./subcategories");
const products = require("./products");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TEST_APP' });
});

router.use('/api/v1', auth);
router.use('/api/v1', categories);
router.use('/api/v1', subcategories);
router.use('/api/v1', products);

module.exports = router;
