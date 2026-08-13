const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    subjectId : {type : mongoose.Schema.Types.ObjectId, ref: "Subject", required: true},
    name : {type: String, required: true},
    difficulty : {type: Number , min: 1, max: 5}
}, {timestamps: true});

module.exports = mongoose.model("Topic", topicSchema);