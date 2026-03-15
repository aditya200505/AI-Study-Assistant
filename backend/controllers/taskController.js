const Task = require('../models/Task');
const Subject = require('../models/Subject');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      include: [{ model: Subject, as: 'subject', attributes: ['subjectName', 'color'] }]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, subjectId, deadline, completed } = req.body;

    const task = await Task.create({
      userId: req.user.id,
      title,
      subjectId: subjectId || null,
      deadline,
      completed,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task (e.g. mark completed)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, subjectId, deadline, completed } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (task) {
      if (task.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      task.title = title !== undefined ? title : task.title;
      task.subjectId = subjectId !== undefined ? subjectId || null : task.subjectId;
      task.deadline = deadline !== undefined ? deadline : task.deadline;
      task.completed = completed !== undefined ? completed : task.completed;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (task) {
      if (task.userId.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await task.destroy();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
