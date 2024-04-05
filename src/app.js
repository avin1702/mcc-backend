require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const { Employee } = require('./models/Employee');
const { Schedule } = require('./models/Schedule');
const { Admin } = require('./models/Admin');
const employeeRoutes = require('./routes/employeeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const authRoutes = require('./routes/authRoutes');
const cronJob = require('./services/cronJob');
const { createAdmin }  = require('./services/adminCreate');
const {logRequests} = require('./middlewares/logMiddleware') 
const cors = require('cors');


console.log("logging env var ",process.env.JWT_SECRET)

cronJob.startCronJob();

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(logRequests)
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/schedules', scheduleRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected');
    createAdmin()
      .then(() => {
        // console.log('Admin created successfully');
        app.listen(3000, () => {
          console.log('Server is running on port 3000');
        });
      })
      .catch(err => {
        console.error('Error creating admin:', err);
      });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });
