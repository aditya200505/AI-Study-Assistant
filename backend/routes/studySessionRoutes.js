const express = require('express');
const router = express.Router();
const { getSessions, createSession } = require('../controllers/studySessionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSessions).post(protect, createSession);

module.exports = router;
