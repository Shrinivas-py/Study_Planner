const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name : {type: String, required: true, unique: true},
    applicableGrades : {type: [Number], default: []}
}, {timestamps:  true});

module.exports = mongoose.model("Subject", subjectSchema);