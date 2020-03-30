const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create user Schema and model
const truckSchema = new Schema({
  name: {
    type: String,
  },
  created_by: {
    type: mongoose.ObjectId,
    required: [true, 'Name field is required'],
  },
  assigned_to: {
    type: mongoose.ObjectId,
    default: null,
  },
  status: {
    type: String,
    required: [true, 'Type field is required'],
    default: 'IS',
  },
  type: {
    type: String,
    required: [true, 'Type field is required'],
  },
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
