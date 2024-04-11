const ordersRouter = require('express').Router();
const OrdersController = require('../controllers/orders.controller');

ordersRouter.route('/')
  .post(OrdersController.createOrder)
  .get(OrdersController.getOrders);

ordersRouter.route('/:orderId')
  .get(OrdersController.getOrder)
  .put(OrdersController.updateOrder)
  .delete(OrdersController.deleteOrder);

module.exports = ordersRouter;