const manufacturersRouter = require('express').Router();
const ManufacturersController = require('../controllers/manufacturers.controller');
const { findManufacturerById } = require('../middlewares/manufacturers.mw');
const productsRouter = require('./productsRouter');

manufacturersRouter
  .route('/')
  .post(ManufacturersController.createManufacturer)
  .get(ManufacturersController.getManufacturers);

// manufacturersRouter.post('/', ManufacturersController.createManufacturer);
// manufacturersRouter.get('/', ManufacturersController.getManufacturers);

manufacturersRouter
  .route('/:manufacturerId')
  .get(ManufacturersController.getManufacturer)
  .put(ManufacturersController.updateManufacturer)
  .delete(ManufacturersController.deleteManufacturer);

// manufacturersRouter.get('/:manufacturerId', ManufacturersController.getManufacturer);
// manufacturersRouter.put('/:manufacturerId', ManufacturersController.updateManufacturer);
// manufacturersRouter.delete('/:manufacturerId', ManufacturersController.deleteManufacturer);

manufacturersRouter.use('/:manufacturerId/products', findManufacturerById, productsRouter);

module.exports = manufacturersRouter;
