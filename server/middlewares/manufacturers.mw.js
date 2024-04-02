const createError = require('http-errors');
const { Manufacturer } = require('../models');

module.exports.findManufacturerById = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    const manufacturer = await Manufacturer.findById(manufacturerId);

    if(!manufacturer) {
      throw createError(404, 'Manufacturer not found');
    }

    req.manufacturer = manufacturer;

    next();
  } catch (error) {
    next(error);
  }
};
