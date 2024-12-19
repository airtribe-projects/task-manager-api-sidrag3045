// task specific routes
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

// Routes for tasks
router.get('/', tasksController.getAllTasks);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
