const Employee = require('../models/Employee');

// Controller method to add an employee
exports.addEmployee = async (req, res) => {
  try {
    const { email, name } = req.body;
    const newEmployee = await Employee.create({ email, name });
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller method to get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};