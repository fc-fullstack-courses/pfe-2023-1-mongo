const fs = require('fs');
const path = require('path');

const currentFileName = path.basename(__filename);

const services = {};

fs.readdirSync(__dirname).filter(fileName => 
  fileName.indexOf('.') !== 0 &&
  fileName !== currentFileName &&
  fileName.slice(-3) === '.js' &&
  fileName.indexOf('.test.js') === -1
).forEach((fileName) => {
  const service = require(path.join(__dirname, fileName));
  services[service.name] = service;

  service.services = services;
});

module.exports = services;