const StudySession = require('../models/StudySession');
const Task = require('../models/Task');
const Subject = require('../models/Subject');
const User = require('../models/User');

// @desc    Get user progress stats
// @route   GET /api/stats
// @access  Private
const getProgressStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get total study time
    const sessions = await StudySession.findAll({ where: { userId } });
    const totalStudyMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);

    // Get tasks completion stats
    const totalTasks = await Task.count({ where: { userId } });
    const completedTasks = await Task.count({ where: { userId, completed: true } });

    // Get total subjects
    const totalSubjects = await Subject.count({ where: { userId } });

    const user = await User.findByPk(userId);

    res.json({
      totalStudyMinutes,
      totalTasks,
      completedTasks,
      totalSubjects,
      currentStreak: user ? user.currentStreak : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProgressStats
};
