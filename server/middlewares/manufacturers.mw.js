const createError = require('http-errors');
const { ManufacturersService } = require('../services');

module.exports.findManufacturerById = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    const manufacturer = await ManufacturersService.findOne({_id: manufacturerId});

    if(!manufacturer) {
      throw createError(404, 'Manufacturer not found');
    }

    req.manufacturer = manufacturer;

    next();
  } catch (error) {
    next(error);
  }
};
