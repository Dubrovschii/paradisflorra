const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {  
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  tableName: 'backend_customer', 
  freezeTableName: true,          
  timestamps: true,               
});

module.exports = Customer;
