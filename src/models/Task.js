const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const statusLabels = {
  pending: 'Pending',
  'done down payment': 'Down Payment Received',
  progress: 'In Progress',
  'done development': 'Development Completed',
  'done full payment': 'Full Payment Completed',
  delivery: 'Delivered'
};

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  no_customers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  down_payment: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dateline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'Pending',
      'Down Payment Received',
      'In Progress',
      'Development Completed',
      'Full Payment Completed',
      'Delivered'
    ),
    allowNull: false,
    defaultValue: 'Pending',
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  underscored: true,
});

Task.getStatusLabel = function(status) {
  return status;
};

module.exports = Task;
