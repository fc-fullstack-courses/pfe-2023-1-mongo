const manufacturersRouter = require('express').Router();
const ManufacturersController = require('../controllers/manufacturers.controller');

manufacturersRouter.route('/')
  .post(ManufacturersController.createManufacturer)
  .get(ManufacturersController.getManufacturers);

// manufacturersRouter.post('/', ManufacturersController.createManufacturer);
// manufacturersRouter.get('/', ManufacturersController.getManufacturers);

manufacturersRouter.route('/:manufacturerId')
  .get(ManufacturersController.getManufacturer)
  .put(ManufacturersController.updateManufacturer)
  .delete(ManufacturersController.deleteManufacturer);

// manufacturersRouter.get('/:manufacturerId', ManufacturersController.getManufacturer);
// manufacturersRouter.put('/:manufacturerId', ManufacturersController.updateManufacturer);
// manufacturersRouter.delete('/:manufacturerId', ManufacturersController.deleteManufacturer);

module.exports = manufacturersRouter;