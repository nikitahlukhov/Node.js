const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create user Schema and model
const loadSchema = new Schema({
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
  status: {
    type: String,
    required: true,
    default: 'NEW',
  },
  state: {
    type: String,
    default: null,
  },
  dimensions: {
    width: {
      type: String,
      required: [true, 'Width field is required'],
    },
    length: {
      type: String,
      required: [true, 'Length field is required'],
    },
    height: {
      type: String,
      required: [true, 'Height field is required'],
    },
  },
  payload: {
    type: Number,
    required: [true, 'Payload field is required'],
  },
  logs: {
    type: Array,
    default: [{
      message: `load created`,
      time: `${new Date()}`}],
  },
});

const Load = mongoose.model('Load', loadSchema);

module.exports = Load;
