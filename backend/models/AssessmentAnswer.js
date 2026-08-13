const mongoose = require("mongoose");
const assessmentAnswerSchema = new mongoose.Schema({
    assessmentId : {type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true}, 
    questionId: {type:  mongoose.Schema.Types.ObjectId, ref: "Question", required: true}, 
    selectedAnswerIndex: {type: Number}, 
    isCorrect : {type: Boolean},
}, {timestamps: true});

module.exports = mongoose.model("AssessmentAnswer", assessmentAnswerSchema);