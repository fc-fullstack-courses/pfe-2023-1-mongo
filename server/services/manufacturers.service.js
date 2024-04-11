const createHttpError = require('http-errors');
const { Manufacturer } = require('../models');

class ManufacturersService {
  static async createManufacturer(manufacturerData) {
    const manufacturer = await Manufacturer.create(manufacturerData);

    return manufacturer;
  }

  static async findManufacturers(
    filter = {},
    options = {
      selectOptions: '-__v',
    }
  ) {
    const { selectOptions, populateOptions } = options;

    let manufacturers;

    if (populateOptions) {
      manufacturers = await Manufacturer.find(filter)
        .select(selectOptions)
        .populate(
          populateOptions.populateField,
          populateOptions.populateSelect
        );
    } else {
      manufacturers = await Manufacturer.find(filter).select(selectOptions);
    }

    return manufacturers;
  }
  static async findManufacturer(
    filter = {},
    options = {
      selectOptions: '-__v',
    }
  ) {
    const { selectOptions, populateOptions } = options;

    let manufacturer;

    if (populateOptions) {
      manufacturer = await Manufacturer.findOne(filter)
        .select(selectOptions)
        .populate(
          populateOptions.populateField,
          populateOptions.populateSelect
        );
    } else {
      manufacturer = await Manufacturer.findOne(filter).select(selectOptions);
    }

    return manufacturer;
  }

  static async updateManufacturer(filter, updateData) {

    const manufacturer = await Manufacturer.findOneAndUpdate(
      filter,
      updateData,
      { new: true }
    );

    if(!manufacturer) {
      throw createHttpError(404, 'Manufacturer not found');
    }

    return manufacturer;
  }

  static async deleteManufacturer(filter) {
    const manufacturer = await Manufacturer.findOneAndDelete(
      filter
    );

    if(!manufacturer) {
      throw createHttpError(404, 'Manufacturer not found');
    }

    return manufacturer;
  }

  static async addProductToManufacturer (manufacturerId, productId) {
    await Manufacturer.updateOne(
      { _id: manufacturerId },
      { $addToSet: { products: productId } }
    );
  }

  static async removeProductFromManufacturer (manufacturerId, productId) {
    await Manufacturer.updateOne(
      { _id: manufacturerId },
      { $pull: { products: productId } }
    );
  }
}

module.exports = ManufacturersService;
