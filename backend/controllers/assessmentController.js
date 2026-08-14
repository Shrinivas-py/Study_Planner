const Assessment = require('../models/Assessment');
const AssessmentAnswer = require('../models/AssessmentAnswer');
const Question = require('../models/Question');
const Topic = require('../models/Topic');
const TopicPerformance = require('../models/TopicPerformance');

// Start an assessment
exports.startAssessment = async (req, res) => {
  try {
    const { subjectId, grade } = req.body;
    const topics = await Topic.find({ subjectId });
    const topicIds = topics.map(t => t._id);
    const questions = await Question.find({ topicId: { $in: topicIds } });
    const assessment = await Assessment.create({
      userId: req.userId,
      subjectId,
      grade,
      startedAt: new Date(),
    });
    const questionsForClient = questions.map(q => ({
      _id: q._id,
      topicId: q.topicId,
      text: q.text,
      options: q.options,
    }));

    res.status(201).json({ assessmentId: assessment._id, questions: questionsForClient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit answers
exports.submitAssessment = async (req, res) => {
  try {
    const {answers} = req.body;
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });

    let correctCount = 0;
    const topicStats = {};

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      const isCorrect = question.correctAnswerIndex === ans.selectedAnswerIndex;
      if (isCorrect) correctCount++;

      await AssessmentAnswer.create({
        assessmentId: assessment._id,
        questionId: question._id,
        selectedAnswerIndex: ans.selectedAnswerIndex,
        isCorrect,
      });

      const tId = question.topicId.toString();
      if (!topicStats[tId]) topicStats[tId] = { correct: 0, total: 0 };
      topicStats[tId].total++;
      if (isCorrect) topicStats[tId].correct++;
    }

    // Update TopicPerformance per topic
    for (const [topicId, stats] of Object.entries(topicStats)) {
      let perf = await TopicPerformance.findOne({ userId: req.userId, topicId });
      if (!perf) {
        perf = await TopicPerformance.create({ userId: req.userId, topicId, correctCount: 0, totalCount: 0 });
      }
      perf.correctCount += stats.correct;
      perf.totalCount += stats.total;
      perf.masteryScore = (perf.correctCount / perf.totalCount) * 100;
      perf.lastAttemptedAt = new Date();
      await perf.save();
    }
    assessment.score = Math.round((correctCount / answers.length) * 100);
    assessment.submittedAt = new Date();
    await assessment.save();

    res.json({ score: assessment.score, correctCount, total: answers.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.startAssessment = async (req, res) => {
  try {
    const { subjectId, grade, topicId } = req.body;

    let topicIds;
    if (topicId) {
      topicIds = [topicId];
    } else {
      const topics = await Topic.find({ subjectId });
      topicIds = topics.map(t => t._id);
    }

    const questions = await Question.find({ topicId: { $in: topicIds } });

    const assessment = await Assessment.create({
      userId: req.userId,
      subjectId,
      grade,
      startedAt: new Date(),
    });

    const questionsForClient = questions.map(q => ({
      _id: q._id,
      topicId: q.topicId,
      text: q.text,
      options: q.options,
    }));

    res.status(201).json({ assessmentId: assessment._id, questions: questionsForClient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};