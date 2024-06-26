const { Schema, model } = require('mongoose');
const yup = require('yup');

const EMAIL_VALIDATION_SCHEMA = yup.string().required().email();

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required for manufacturer and must string'],
    match: [
      /[A-Za-z0-9. ]+/,
      'Manufacturer name must only contain English letters, numbers and dot',
    ],
    unique: true,
  },
  // name: Schema.Types.String
  estimatedValue: {
    type: Number,
    min: 0,
    max: 9999999,
    default: 75000
  },
  isSubsidiary: {
    type: Boolean,
    default: false
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
        message: (props) => {
          // console.log(props);
          return `${props.value} is not a valid email`;
        },
      },
    },
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
});

const Manufacturer = model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;
