const manufacturersRouter = require('express').Router();
const ManufacturersController = require('../controllers/manufacturers.controller');

manufacturersRouter.post('/', ManufacturersController.createManufacturer);
manufacturersRouter.get('/', ManufacturersController.getManufacturers);

manufacturersRouter.get('/:manufacturerId', ManufacturersController.getManufacturer);
manufacturersRouter.put('/:manufacturerId', ManufacturersController.updateManufacturer);
manufacturersRouter.delete('/:manufacturerId', ManufacturersController.deleteManufacturer);

module.exports = manufacturersRouter;