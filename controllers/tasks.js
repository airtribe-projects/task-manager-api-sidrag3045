// Logic to handle all the tasks
const fs = require('fs');
const path = require('path');
const tasksFilePath = path.join(__dirname, '../task.json');

// Helper to load tasks from file
const loadTasks = () => JSON.parse(fs.readFileSync(tasksFilePath, 'utf8')).tasks;

// Helper to save tasks to file
const saveTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify({ tasks }, null, 2));
};

// Controller functions
exports.getAllTasks = (req, res) => {
  const tasks = loadTasks();
  res.status(200).json(tasks);
};

exports.getTaskById = (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  task ? res.status(200).json(task) : res.status(404).json({ message: 'Task not found' });
};

exports.createTask = (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Invalid task data' });
  }

  const tasks = loadTasks();
  const newTask = { id: tasks.length + 1, title, description, completed };
  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Invalid task data' });
  }

  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  tasks[taskIndex] = { id: parseInt(req.params.id), title, description, completed };
  saveTasks(tasks);
  res.status(200).json(tasks[taskIndex]);
};

exports.deleteTask = (req, res) => {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  res.status(200).json({ message: 'Task deleted' });
};
