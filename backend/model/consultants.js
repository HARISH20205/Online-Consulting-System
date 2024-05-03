const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const consultantsSchema = new Schema({
  service: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  avgRating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("consultants", consultantsSchema);
