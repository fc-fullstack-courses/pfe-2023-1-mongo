const rootRouter = require('express').Router();
const manufacturersRouter = require('./manufacturersRouter');
const ProductsController = require('../controllers/products.controller');

rootRouter.use('/manufacturers', manufacturersRouter);

rootRouter.get('/products', ProductsController.getAllProducts);

rootRouter.route('/products/:productId')
  .get(ProductsController.getProduct)
  .put(ProductsController.updateProduct);
module.exports = rootRouter;
