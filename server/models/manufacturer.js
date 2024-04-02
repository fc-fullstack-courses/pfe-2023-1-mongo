const { Schema, model } = require('mongoose');
const yup = require('yup');

const EMAIL_VALIDATION_SCHEMA = yup.string().required().email();

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: /[A-Za-z0-9. ]+/,
    unique: true,
  },
  // name: Schema.Types.String
  estimatedValue: {
    type: Number,
    min: 0,
    max: 9999999,
  },
  isSubsidiary: {
    type: Boolean,
  },
  creationDate: {
    type: Date,
    min: new Date(0, 1, 1),
  },
  address: {
    country: {
      type: String,
      enum: ['UA', 'Ukraine', 'UK', 'GB', 'SWE', 'IT'],
    },
    city: String,
    postalCode: Number,
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: async (emailValue) =>
          EMAIL_VALIDATION_SCHEMA.isValid(emailValue),
      },
    },
  },
});

const Manufacturer = model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
