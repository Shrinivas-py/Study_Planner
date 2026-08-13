const mongoose = require("mongoose");
const topicPerformanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  correctCount: { type: Number, default: 0 },
  totalCount: { type: Number, default: 0 },
  masteryScore: { type: Number, default: 0 },
  lastAttemptedAt: Date,
});
topicPerformanceSchema.index({ userId: 1, topicId: 1 }, { unique: true });

module.exports = mongoose.model('TopicPerformance', topicPerformanceSchema);