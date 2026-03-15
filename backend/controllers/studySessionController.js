const StudySession = require('../models/StudySession');
const { updateStreak } = require('../utils/streakUtil');

// @desc    Get all study sessions for a user
// @route   GET /api/sessions
// @access  Private
const getSessions = async (req, res) => {
  try {
    const sessions = await StudySession.findAll({ where: { userId: req.user.id } });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Log a new study session
// @route   POST /api/sessions
// @access  Private
const createSession = async (req, res) => {
  try {
    const { duration, date } = req.body;

    const session = await StudySession.create({
      userId: req.user.id,
      duration,
      date,
    });
    
    await updateStreak(req.user.id);

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSessions,
  createSession,
};
