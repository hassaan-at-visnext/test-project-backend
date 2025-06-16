const Product = Object.freeze({

  Messages: {
    GET_ALL_PRODUCTS_FAILED: "Something went wrogn while getting all the products. Please try again",
    GET_PRODUCTS_BY_CATEGORY_FAILED: 'Something went wrong while getting all the products by category. Please try again',
    GET_PRODUCTS_BY_SUBCATEGORY_FAILED: 'Something went wrong while getting all the products by subcategory. Please try again',
    GET_PRODUCT_BY_ID_FAILED: 'Something went wrong while getting the product by id. Please try again.',
    PRODUCT_SEARCH_FAILED: 'Search of product failed.'
  }
});

module.exports = Product;