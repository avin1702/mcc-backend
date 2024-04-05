const cron = require('node-cron');
const { Op } = require('sequelize');
const Schedule = require('../models/Schedule');
const { sendEmail } = require('./emailService');

function startCronJob() {
  console.log('cronjob started');

  const processedSchedules = {
    '60': new Map(), // Map to keep track of processed schedules for 1 hour before
    '30': new Map(), // Map to keep track of processed schedules for 30 minutes before
    '15': new Map()  // Map to keep track of processed schedules for 15 minutes before
  };
  let adminEmailSent = false; // Flag to track if admin email has been sent

  cron.schedule('* * * * *', async () => {
    try {
      const currentDateTime = new Date();
      const todayDate = new Date().toISOString().slice(0, 10);

      const timeRanges = [
        { minutes: 60, label: '1 hour before', key: '60' },
        { minutes: 30, label: '30 minutes before', key: '30' },
        { minutes: 15, label: '15 minutes before', key: '15' }
      ];

      for (const { minutes, label, key } of timeRanges) {
        const endTime = new Date(currentDateTime.getTime() + minutes * 60 * 1000);

        // Fetch schedules for the current time range
        const schedules = await Schedule.findAll({
          where: {
            date: todayDate, // Filter for today's date
            time: {
              [Op.between]: [
                currentDateTime.toTimeString().slice(0, 8), 
                endTime.toTimeString().slice(0, 8)          
              ]
            }
          }
        });

        // Process schedules within the current time range
        for (const schedule of schedules) {
          const { id, time, comment, email } = schedule;
          if (!processedSchedules[key].has(id)) { 
            const emailSubject = `Reminder: ${label}`;
            const emailBody = `Scheduled time: ${time}\nComment: ${comment}`;
            await sendEmail(email, emailSubject, emailBody);
            processedSchedules[key].set(id, true); 
          }
        }
      }

      
      if (!adminEmailSent && Object.values(processedSchedules).every(map => map.size > 0)) {
        await sendEmail(process.env.ADMIN_EMAIL, 'All Batch Emails Sent', 'All batch emails have been sent.');
        adminEmailSent = true; 
      }
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });
}

module.exports = { startCronJob };
