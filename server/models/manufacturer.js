const { Schema, model } = require('mongoose');

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: /[A-Za-z0-9. ]+/,
    unique: true
  },
  // name: Schema.Types.String
  estimatedValue: {
    type: Number,
    min: 0,
    max: 9999999
  },
  isSubsidiary: {
    type: Boolean,
  },
  creationDate: {
    type: Date,
    min: new Date(0,1,1),
  },
  address: {
    country: {
      type: String, 
      enum : ['UA', 'Ukraine', 'UK', 'GB', 'SWE', 'IT']
    },
    city: String,
    postalCode: Number,
  },
});

const Manufacturer = model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
