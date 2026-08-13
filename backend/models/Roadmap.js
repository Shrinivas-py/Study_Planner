const mongoose = require("mongoose");
const roadmapTopicSchema = new mongoose.Schema({
    topicId : {type:mongoose.Schema.Types.ObjectId, ref: "Topic", required: true}, 
    priority:{type:Number},
    status:{type:String, enum:["pending", "in-progress", "done"], default:"pending"},
    activityType: {type: String}
}, {_id : false});

const roadmapSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, 
    subjectId : {type: mongoose.Schema.Types.ObjectId, ref:"Subject", required: true}, 
    topics : {type:[roadmapTopicSchema], default:[]}
}, {timestamps :  true});

module.exports = mongoose.model("Roadmap", roadmapSchema);  