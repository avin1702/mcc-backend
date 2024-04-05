
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Schedule = require('./Schedule');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
}
},
{timestamps: false}
);

// Employee.hasMany(Schedule, { foreignKey: 'employeeEmail', sourceKey: 'email' });

module.exports = Employee;