const sequelize = require('../config/db');
const Admin = require('../models/Admin');
const { hashPassword } = require('../controllers/authController');

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { username: 'admin' } });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword('admin');
    
    // Create the admin record
    await Admin.create({
      username: 'admin',
      password: hashedPassword
    });

    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    // Close the database connection
    // await sequelize.close();
  }
}

// Call the function to create the admin record
module.exports = { createAdmin };
