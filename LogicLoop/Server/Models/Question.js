const mongoose = require("mongoose");

const QuesionSchema = mongoose.Schema({
  question: {
    type: String,
    require: true,
  },
  options: {
    type: [String],
    require: true,
    validate: [arrayLimit, "{PATH} must have exactly 4 options"],
  },
  ans: {
    type: String,
    require: true,
  },
});

// Custom validator to ensure exactly 4 options
function arrayLimit(val) {
  return val.length === 4;
}

const Question = mongoose.model("Question", QuesionSchema);
module.exports = Question;
