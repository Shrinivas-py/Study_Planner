const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {getRoadmap} = require('../controllers/roadmapController');

router.get('/:subjectId', auth, getRoadmap);

module.exports = router;