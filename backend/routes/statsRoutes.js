const express = require('express');
const router = express.Router();
const { getProgressStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getProgressStats);

module.exports = router;
