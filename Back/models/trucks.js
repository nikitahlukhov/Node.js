const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create truck Schema and model
const truckSchema = new Schema({
  name: {
    type: String,
    default: 'untitled',
  },
  created_by: {
    type: mongoose.ObjectId,
    required: true,
  },
  assigned_to: {
    type: mongoose.ObjectId,
    default: null,
  },
  isAssigned: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: 'IS',
  },
  type: {
    type: String,
    required: [true, 'Type field is required'],
  },
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
