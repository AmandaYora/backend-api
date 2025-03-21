const Task = require('../models/Task');
const { Op } = require('sequelize');

const getAllTasks = async () => {
  return await Task.findAll();
};

const getTaskById = async (id) => {
  return await Task.findByPk(id);
};

const createTask = async (data) => {
  return await Task.create(data);
};

const updateTask = async (id, data) => {
  const task = await Task.findByPk(id);
  if (!task) throw new Error('Task tidak ditemukan');
  return await task.update(data);
};

const deleteTask = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) throw new Error('Task tidak ditemukan');
  return await task.destroy();
};

const getTasksByNoCustomers = async (no_customers) => {
  return await Task.findAll({
    where: { no_customers }
  });
};

const getTasksByTitle = async (title) => {
  return await Task.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`
      }
    }
  });
};

const getTasksByTotalPrice = async (total_price) => {
  return await Task.findAll({
    where: { total_price }
  });
};

const getTasksByDateline = async (dateline) => {
  return await Task.findAll({
    where: { dateline }
  });
};

const getTasksByStatus = async (status) => {
  return await Task.findAll({
    where: { status }
  });
};

const getTasksByStatusAndDateline = async (status, dateline) => {
  return await Task.findAll({
    where: { status, dateline }
  });
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
