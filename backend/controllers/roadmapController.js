const TopicPerformance = require('../models/TopicPerformance');
const Topic = require('../models/Topic');
const Roadmap = require('../models/Roadmap');
const { generateRoadmap } = require('../services/recommendationEngine');

exports.getRoadmap = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const topics = await Topic.find({ subjectId });
    const topicsMap = {};
    topics.forEach(t => { topicsMap[t._id.toString()] = t; });

    const performances = await TopicPerformance.find({
      userId: req.userId,
      topicId: { $in: topics.map(t => t._id) },
    });

    const roadmapTopics = generateRoadmap(performances, topicsMap);

let roadmap = await Roadmap.findOne({ userId: req.userId, subjectId });
if (!roadmap) {
  roadmap = new Roadmap({ userId: req.userId, subjectId, topics: [] });
}

// Preserve existing status for topics that already have one
const existingStatusMap = {};
roadmap.topics.forEach(t => { existingStatusMap[t.topicId.toString()] = t.status; });

roadmapTopics.forEach(t => {
  const existingStatus = existingStatusMap[t.topicId.toString()];
  if (existingStatus) t.status = existingStatus;
});

roadmap.topics = roadmapTopics;
await roadmap.save();

res.json({ roadmap: roadmapTopics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateTopicStatus = async(req,res)=>{
    try{
        const {subjectId,topicId} = req.params;
        const {status }  = req.body;
        const roadmap = await Roadmap.findOne({userId: req.userId, subjectId});
        if(!roadmap) return res.status(404).json({message : 'Roadmap not found'});
        const topicEntry = roadmap.topics.find(t=>t.topicId.toString()===topicId);
        if(!topicEntry) return res.status(404).json({message : 'Topic not found'});

        topicEntry.status = status;
        await roadmap.save();

        res.json({roadmap :  roadmap.topics});
    } catch(err){
        res.status(500).json({message : err.message});
    }
};