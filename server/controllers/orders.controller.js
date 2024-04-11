const { OrdersService } = require('../services');

module.exports.createOrder = async (req, res, next) => {
  try {
    const { body } = req;

    const order = await OrdersService.create(body);

    res.status(201).send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrders = async (req, res, next) => {
  try {
    const orders = await OrdersService.findAll();

    res.send({ data: orders });
  } catch (error) {
    next(error);
  }
};

module.exports.getOrder = async (req, res, next) => {
  try {
    const {
      params: { orderId },
    } = req;

    const order = await OrdersService.findOne({ _id: orderId });

    res.send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOrder = async (req, res, next) => {
  try {
    const {params: { orderId }, body} = req;

    const order = await OrdersService.updateOne({_id: orderId}, body);

    res.send({ data: order });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    const {
      params: { orderId },
    } = req;

    const order = await OrdersService.deleteOne({_id: orderId});

    res.send({ data: order });
  } catch (error) {
    next(error);
  }
};
