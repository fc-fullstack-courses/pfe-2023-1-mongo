const createHttpError = require('http-errors');
const { Product, Manufacturer } = require('../models');

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

    res.status(201).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate('manufacturer')
      .select('-__v');

    res.status(200).send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProducts = async (req, res, next) => {
  try {
    
    const products = await Product.find().populate('manufacturer').select('-__v');

    res.status(200).send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await Product.findById(productId)
      .populate({ path: 'manufacturer', select: ['-products', '-__v'] })
      .select('-__v');

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
      body,
    } = req;

    // 1. якщо ми намагаємося оновити виробника то маємо перевірити. чи він існує
    if (body.manufacturer) {
      const manufacturer = await Manufacturer.findById(body.manufacturer);

      if (!manufacturer) {
        throw createHttpError(404, 'Manufacturer not found');
      }
    }

    // 2. оновити продукт
    let product = await Product.findByIdAndUpdate(productId, body);

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    // 3. якщо ми оновили виробника то треба
    if (body.manufacturer) {
      // 3.1 видалити id товара у старого виробника
      await Manufacturer.updateOne( { _id: product.manufacturer },{
        $pull: { products: product._id }
      });

      // 3.2 додати новому виробнику id товара
      await Manufacturer.updateOne(
        { _id: body.manufacturer },
        { $addToSet: { products: product._id } }
      );
    }

    // 4. повернути оновлені дані про продукт
    product = await Product.findById(productId).select('-__v');

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
}