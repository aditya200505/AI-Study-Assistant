const User = require('../models/User');

const updateStreak = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!user.lastStudyDate) {
    // First time studying
    user.lastStudyDate = new Date();
    user.currentStreak = 1;
  } else {
    const lastDate = new Date(user.lastStudyDate);
    lastDate.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Studied yesterday, increment streak
      user.currentStreak += 1;
      user.lastStudyDate = new Date();
    } else if (diffDays > 1) {
      // Missed a day, reset streak
      user.currentStreak = 1;
      user.lastStudyDate = new Date();
    }
    // If diffDays === 0, they already studied today, streak remains the same
  }

  await user.save();
};

module.exports = { updateStreak };
