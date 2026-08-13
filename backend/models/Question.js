const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topicId : {type: mongoose.Schema.Types.ObjectId, ref:"Topic", required: true},
    text : {type: String, required: true},
    options : {type: [String], required: true},
    correctAnswerIndex : {type: Number, required: true},
    difficulty :{type: Number , min: 1, max: 5}
}, {timestamps: true});

module.exports  = mongoose.model("Question", questionSchema);