const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const colourSchema = new Schema({
    colourName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  colourCode: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 10,
    trim: true,
  },
  colourDesc: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 280,
    trim: true,
  }
});

const Colour = model('Colour', colourSchema);

module.exports = Colour;
