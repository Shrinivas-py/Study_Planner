const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    subjectId: {type:mongoose.Schema.Types.ObjectId, ref: "Subject", required: true}, 
    grade : {type: Number},
    score :{type: Number, default:0},
    startedAt: {type: Date},
    submittedAt : {type: Date}
}, {timestamps: true});

module.exports = mongoose.model("Assessment", assessmentSchema);