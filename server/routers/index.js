const rootRouter = require('express').Router();
const manufacturersRouter = require('./manufacturersRouter');
const ProductsController = require('../controllers/products.controller');
const ordersRouter = require('./ordersRouter');

rootRouter.use('/manufacturers', manufacturersRouter);

rootRouter.get('/products', ProductsController.getAllProducts);

rootRouter.use('/orders', ordersRouter);

rootRouter.route('/products/:productId')
  .get(ProductsController.getProduct)
  .put(ProductsController.updateProduct)
  .delete(ProductsController.deleteProduct);

module.exports = rootRouter;
