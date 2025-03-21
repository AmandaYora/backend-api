const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/search/no-customers', taskController.getTasksByNoCustomers);
router.get('/search/title', taskController.getTasksByTitle);
router.get('/search/total-price', taskController.getTasksByTotalPrice);
router.get('/search/dateline', taskController.getTasksByDateline);
router.get('/search/status', taskController.getTasksByStatus);
router.get('/search/status-dateline', taskController.getTasksByStatusAndDateline);

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
