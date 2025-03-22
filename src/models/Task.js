const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
      'pending',
      'done down payment',
      'progress',
      'done development',
      'done full payment',
      'delivery'
    ),
    allowNull: false,
    defaultValue: 'pending',
  }
}, {
  tableName: 'tasks',
  timestamps: true,     
  underscored: true,      
});

Task.getStatusLabel = function(status) {
  const labels = {
    pending: 'Pending',
    'done down payment': 'Down Payment Received',
    progress: 'In Progress',
    'done development': 'Development Completed',
    'done full payment': 'Full Payment Completed',
    delivery: 'Delivered'
  };
  return labels[status] || status;
};

module.exports = Task;
