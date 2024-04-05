const Schedule = require('../models/Schedule');

async function getAllSchedules(req, res) {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createSchedules(req, res) {
    try {
      const schedulesData = req.body; 

      const savedSchedules = await Promise.all(schedulesData.map(async (schedule) => {
          if (!schedule.date || !schedule.time || !schedule.comment || !schedule.email) {
          throw new Error('Invalid schedule data');
        }
  
        // Save schedule to the database
        const savedSchedule = await Schedule.create({
          date: schedule.date,
          time: schedule.time,
          comment: schedule.comment,
          email: schedule.email
        });
  
        return savedSchedule;
      }));
  
      res.status(201).json(savedSchedules);
    } catch (error) {
      console.error('Error creating schedules:', error);
      res.status(500).json({ message: 'Failed to create schedules' });
    }
}
 
module.exports = { getAllSchedules, createSchedules };