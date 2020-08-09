const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  rightAnswer: {
    type: String,
    required: true
  },
  additionalAnswerInfo: {
    type: String,
    required: true
  },
  additionalInfoImage: {
    type: String,
    required: false
  }
});

// export model user with UserSchema
module.exports = mongoose.model("quizQuestions", QuizSchema,"quizQuestions");