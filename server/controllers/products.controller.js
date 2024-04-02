const { Product } = require('../models');

module.exports.createProduct = async (req, res, next) => {
  try {
    const { body, manufacturer } = req;

    // 1. Створити продукт
    const product = await Product.create({
      ...body,
      manufacturer: manufacturer._id
    });

    // 2. доповнити масив продуктів у виробника конкретним записом про новий продукт

    // додає айді до масиву
    await manufacturer.updateOne({ $push: { products: product._id }});

    // додає айді до масиву якщо тай його немає
    // await manufacturer.updateOne({ $addToSet: { products: product._id }});

    res.status(201).send({data: product});
  } catch (error) {
    next(error);
  }
};

module.exports.getProducts = async (req, res, next) => {
  try {
    
    const products = await Product.find().populate('manufacturer');

    res.status(200).send({data: products});
  } catch (error) {
    next(error);
  }
}