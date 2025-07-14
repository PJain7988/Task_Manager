import Task from '../models/taskModel.js';

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { completed } = req.query;
    let tasks;

    if (completed !== undefined) {
      tasks = await Task.find({ completed: completed === 'true' });
    } else {
      tasks = await Task.find();
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID format or server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID or server error' });
  }
};