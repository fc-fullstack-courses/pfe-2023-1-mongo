const createHttpError = require('http-errors');
const { Product, Manufacturer } = require('../models');

class ProductsService {
  static async createProduct(productData, manufacturer) {
    // 1. Створити продукт
    const product = await Product.create({
      ...productData,
      manufacturer: manufacturer._id,
    });

    // 2. доповнити масив продуктів у виробника конкретним записом про новий продукт

    // додає айді до масиву
    await manufacturer.updateOne({ $push: { products: product._id } });

    // додає айді до масиву якщо тай його немає
    // await manufacturer.updateOne({ $addToSet: { products: product._id }});

    return product;
  }

  static async findProducts(
    filter = {},
    options = {
      selectOptions: '-__v',
    }
  ) {
    const { selectOptions, populateOptions } = options;

    let products;

    if (populateOptions) {
      products = await Product.find(filter)
        .select(selectOptions)
        .populate(
          populateOptions.populateField,
          populateOptions.populateSelect
        );
    } else {
      products = await Product.find(filter).select(selectOptions);
    }

    return products;
  }

  static async findProduct(
    filter = {},
    options = {
      selectOptions: '-__v',
      // populateOptions: {
      //   populateField: 'manufacturer',
      //   populateSelect: '-__v -products',
      // },
    }
  ) {

    const { selectOptions, populateOptions } = options;

    let product;

    if (populateOptions) {
      product = await Product.findOne(filter)
        .select(selectOptions)
        .populate(
          populateOptions.populateField,
          populateOptions.populateSelect
        );
    } else {
      product = await Product.findOne(filter).select(selectOptions);
    }

    return product;
  }

  static async updateProduct (filter, updateData) {
    // 1. якщо ми намагаємося оновити виробника то маємо перевірити. чи він існує
    if (updateData.manufacturer) {
      const manufacturer = await Manufacturer.findById(updateData.manufacturer);

      if (!manufacturer) {
        throw createHttpError(404, 'Manufacturer not found');
      }
    }

    // 2. оновити продукт
    let product = await Product.findOneAndUpdate(filter, updateData);

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    // 3. якщо ми оновили виробника то треба
    if (updateData.manufacturer) {
      // 3.1 видалити id товара у старого виробника
      await Manufacturer.updateOne(
        { _id: product.manufacturer },
        {
          $pull: { products: product._id },
        }
      );

      // 3.2 додати новому виробнику id товара
      await Manufacturer.updateOne(
        { _id: updateData.manufacturer },
        { $addToSet: { products: product._id } }
      );
    }

    // 4. повернути оновлені дані про продукт
    product = await ProductsService.findProduct(filter, {selectOptions: '-__v'});

    return product;
  }

  static async deleteProduct (filter) {

    // 1. видалити продукт
    const product = await Product.findOneAndDelete(filter);

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    // 2. видалити id товара у виробника
    await Manufacturer.updateOne(
      { _id: product.manufacturer },
      {
        $pull: { products: product._id },
      }
    );

    return product;
  }
}

module.exports = ProductsService;
