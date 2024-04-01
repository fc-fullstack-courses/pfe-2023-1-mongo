const mongoose = require('mongoose');
const Manufacturer = require('./manufacturer');

async function connectToDb() {

  await mongoose.connect('mongodb://localhost:27017/shop');
}
// mongodb+srv://admin:admin@cluster0.tskuxah.mongodb.net/firstDb
// mongodb://localhost:27017/firstDb

connectToDb().catch(err => console.log(err));

module.exports = {
  Manufacturer
}