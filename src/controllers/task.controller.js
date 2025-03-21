const taskService = require('../services/task.service');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, message: "Berhasil mendapatkan semua task", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task tidak ditemukan", data: [] });
    res.json({ success: true, message: "Berhasil mendapatkan task", data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json({ success: true, message: "Task berhasil dibuat", data: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.json({ success: true, message: "Task berhasil diperbarui", data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ success: true, message: "Task berhasil dihapus", data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTasksByNoCustomers = async (req, res) => {
  try {
    const { no_customers } = req.query;
    if (!no_customers) return res.status(400).json({ success: false, message: "Parameter no_customers tidak disediakan", data: [] });
    const tasks = await taskService.getTasksByNoCustomers(no_customers);
    res.json({ success: true, message: "Berhasil mendapatkan tasks berdasarkan no_customers", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTasksByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(400).json({ success: false, message: "Parameter title tidak disediakan", data: [] });
    const tasks = await taskService.getTasksByTitle(title);
    res.json({ success: true, message: "Berhasil mendapatkan tasks berdasarkan title", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTasksByTotalPrice = async (req, res) => {
  try {
    const { total_price } = req.query;
    if (!total_price) return res.status(400).json({ success: false, message: "Parameter total_price tidak disediakan", data: [] });
    const tasks = await taskService.getTasksByTotalPrice(total_price);
    res.json({ success: true, message: "Berhasil mendapatkan tasks berdasarkan total_price", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTasksByDateline = async (req, res) => {
  try {
    const { dateline } = req.query;
    if (!dateline) return res.status(400).json({ success: false, message: "Parameter dateline tidak disediakan", data: [] });
    const tasks = await taskService.getTasksByDateline(dateline);
    res.json({ success: true, message: "Berhasil mendapatkan tasks berdasarkan dateline", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    if (!status) return res.status(400).json({ success: false, message: "Parameter status tidak disediakan", data: [] });
    const tasks = await taskService.getTasksByStatus(status);
    res.json({ success: true, message: "Berhasil mendapatkan tasks berdasarkan status", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

const getTasksByStatusAndDateline = async (req, res) => {
  try {
    const { status, dateline } = req.query;
    if (!status || !dateline) return res.status(400).json({ success: false, message: "Parameter status dan dateline harus disediakan", data: [] });
    const tasks = await taskService.getTasksByStatusAndDateline(status, dateline);
    res.json({ success: true, message: "Berhasil mendapatkan tasks berdasarkan status dan dateline", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: [] });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByNoCustomers,
  getTasksByTitle,
  getTasksByTotalPrice,
  getTasksByDateline,
  getTasksByStatus,
  getTasksByStatusAndDateline,
};
