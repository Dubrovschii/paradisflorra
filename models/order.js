const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
  },
  city: {
    type: DataTypes.STRING(100),
  },
  district: {
    type: DataTypes.STRING(100),
  },
  street: {
    type: DataTypes.STRING(100),
  },
  house_number: {
    type: DataTypes.STRING(50),
  },
  apartment: {
    type: DataTypes.STRING(50),
  },
  notes: {
    type: DataTypes.TEXT,
  },
  payment_method: {
    type: DataTypes.STRING(50),
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'backend_order',
  timestamps: false,  // так как есть только created_at, обновление не хранится
});

module.exports = Order;
