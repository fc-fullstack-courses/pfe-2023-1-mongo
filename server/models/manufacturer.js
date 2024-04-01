const { Schema, model } = require('mongoose');

const manufacturerSchema = new Schema({
  name : String,
  // name: Schema.Types.String
  estimatedValue : Number,
  isSubsidiary : Boolean,
  creationDate : Date,
  address : {
    country: String,
    city: String,
    postalCode: Number
  }
});

const Manufacturer = model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;