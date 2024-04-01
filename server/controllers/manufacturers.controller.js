const { Manufacturer } = require('../models');

module.exports.createManufacturer = async (req, res, next) => {
  try {
    const { body } = req;

    const manufacturer = await Manufacturer.create(body);

    res.status(201).send({ data: manufacturer });
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturer = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    // const manufacturer = await Manufacturer.findById(manufacturerId);

    const manufacturer = await Manufacturer.findOne({ _id: manufacturerId });

    res.status(200).send({ data: manufacturer });
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturers = async (req, res, next) => {
  try {
    const manufacturers = await Manufacturer.find();

    res.status(200).send({ data: manufacturers });
  } catch (error) {
    next(error);
  }
};

module.exports.updateManufacturer = async (req, res, next) => {
  try {
    const {
      body,
      params: { manufacturerId },
    } = req;

    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      manufacturerId,
      body,
      { new: true }
    );

    res.status(200).send({ data: updatedManufacturer });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteManufacturer = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    const deletedManufacturer = await Manufacturer.findByIdAndDelete(
      manufacturerId
    );

    res.status(200).send({ data: deletedManufacturer });
  } catch (error) {
    next(error);
  }
};
