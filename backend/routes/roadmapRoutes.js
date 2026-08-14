const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getRoadmap, updateTopicStatus } = require('../controllers/roadmapController');

router.get('/:subjectId', auth, getRoadmap);
router.patch('/:subjectId/topic/:topicId', auth, updateTopicStatus);

module.exports = router;