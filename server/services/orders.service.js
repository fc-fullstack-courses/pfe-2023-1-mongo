const createHttpError = require('http-errors');
const { Order } = require('../models');

class OrdersService {
  static async create(orderData) {
    const { ProductsService } = OrdersService.services;

    const { products, ...restOrder } = orderData;

    // const productsInOrder = [];

    // for( const {product: id, quantity} of products) {
    //   const product = await ProductsService.findOne({_id: id});

    //   productsInOrder.push({
    //     product: id,
    //     quantity,
    //     price: product.price,
    //     name: product.name
    //   });
    // }

    const productIds = products.map((p) => p.product);
    // console.log("productIds");
    // console.log(productIds);

    const foundProducts = await ProductsService.findAll({ _id: productIds });
    // console.log("foundProducts");
    // console.log(foundProducts);

    const productsInOrder = foundProducts.map((productData) => {
      return {
        product: productData._id,
        quantity: products.find((p) => p.product == productData._id).quantity,
        price: productData.price,
        name: productData.name,
      };
    });
    // console.log("productsInOrder");
    // console.log(productsInOrder);

    // const totalPrice = productsInOrder.reduce((acc, product,) => acc += product.quantity * product.price, 0)

    // console.log(totalPrice);

    const order = await Order.create({
      ...restOrder,
      products: productsInOrder,
    });

    return order;
  }

  static async findAll(
    filter = {},
    options = {
      selectOptions: '-__v',
    }
  ) {
    const orders = await Order.find(filter).select(options.selectOptions);

    return orders;
  }

  static async findOne(
    filter = {},
    options = {
      selectOptions: '-__v',
    }
  ) {
    const order = await Order.findOne(filter).select(options.selectOptions);

    if (!order) {
      throw createHttpError(404, 'Order not found');
    }

    return order;
  }

  static async updateOne(filter, updateData) {
    const order = await Order.findOneAndUpdate(filter, updateData, {
      new: true,
    });

    if (!order) {
      throw createHttpError(404, 'Order not found');
    }

    return order;
  }

  static async deleteOne(filter) {
    const order = await Order.findOneAndDelete(filter);

    if (!order) {
      throw createHttpError(404, 'Order not found');
    }

    return order;
  }
}

module.exports = OrdersService;
