const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {startAssessment, submitAssessment} = require('../controllers/assessmentController');

router.post('/start', auth, startAssessment);
router.post('/:id/submit', auth, submitAssessment);

module.exports = router;