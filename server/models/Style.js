const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const styleSchema = new Schema({
    styleName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  styleCode: {
    type: Number,
    required: true,
    minlength: 6,
    maxlength: 10,
    trim: true,
  },
  styleDesc: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 280,
    trim: true,
  },
  colours: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Colour',
    },
  ],
//   images: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Image',
//     },
//   ],
});

const Style = model('Style', styleSchema);

module.exports = Style;
