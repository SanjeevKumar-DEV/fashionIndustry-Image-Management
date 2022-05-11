const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const imageSchema = new Schema({
  imageName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 280,
    trim: true,
  },
  imageURL: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  style: {
    type: Schema.Types.ObjectId,
    ref: 'Style',
  },
  colour: {
    type: Schema.Types.ObjectId,
    ref: 'Colour',
  },
});

const Image = model("Image", imageSchema);

module.exports = Image;
