const createHttpError = require('http-errors');
const { ProductsService } = require('../services');

module.exports.createProduct = async (req, res, next) => {
  try {
    const { body, manufacturer } = req;

    const product = await ProductsService.create(body, manufacturer);

    res.status(201).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductsService.findAll(
      {},
      {
        selectOptions: '-__v',
        populateOptions: {
          populateField: 'manufacturer',
          populateSelect: '-__v -products',
        },
      }
    );

    res.status(200).send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProducts = async (req, res, next) => {
  try {
    const { manufacturer } = req;

    const products = await ProductsService.findAll(
      { manufacturer: manufacturer._id },
      { populateOptions: { shouldPopulate: false } }
    );

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

    const product = await ProductsService.findOne(
      { _id: productId },
      {
        populateOptions: {
          populateField: 'manufacturer',
          populateSelect: ['-products', '-__v'],
        },
      }
    );

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

    const product = await ProductsService.updateOne(
      { _id: productId },
      body
    );

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await ProductsService.deleteOne({ _id: productId });

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
};
