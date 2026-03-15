const Subject = require('../models/Subject');

// @desc    Get all subjects for a user
// @route   GET /api/subjects
// @access  Private
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({ where: { userId: req.user.id } });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a subject
// @route   POST /api/subjects
// @access  Private
const createSubject = async (req, res) => {
  try {
    const { subjectName, color } = req.body;

    const subject = await Subject.create({
      userId: req.user.id,
      subjectName,
      color,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = async (req, res) => {
  try {
    const { subjectName, color } = req.body;

    const subject = await Subject.findByPk(req.params.id);

    if (subject) {
      if (subject.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      subject.subjectName = subjectName || subject.subjectName;
      subject.color = color || subject.color;

      const updatedSubject = await subject.save();
      res.json(updatedSubject);
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);

    if (subject) {
      if (subject.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await subject.destroy();
      res.json({ message: 'Subject removed' });
    } else {
      res.status(404).json({ message: 'Subject not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
