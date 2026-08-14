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
    roadmap.topics = roadmapTopics;
    await roadmap.save();

    res.json({ roadmap: roadmapTopics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};