module.exports.createManufacturer = async (req, res, next) => {
  try {
    const { body } = req;
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturer = async (req, res, next) => {
  try {
    const { params: {manufacturerId} } = req;
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturers = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error);
  }
};

module.exports.updateManufacturer = async (req, res, next) => {
  try {
    const { body, params: {manufacturerId} } = req;
  } catch (error) {
    next(error);
  }
};

module.exports.deleteManufacturer = async (req, res, next) => {
  try {
    const { params: {manufacturerId} } = req;
  } catch (error) {
    next(error);
  }
};
