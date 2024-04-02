const productsRouter = require('express').Router();
const ProductsController = require('../controllers/products.controller');

productsRouter
  .route('/')
  .post(ProductsController.createProduct)
  .get(ProductsController.getProducts);

module.exports = productsRouter;
