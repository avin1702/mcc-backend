const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Buffer.from(process.env.NODEMAILER_USER, 'base64').toString('utf-8'),
    pass: Buffer.from(process.env.NODEMAILER_PASSWORD, 'base64').toString('utf-8')
  }
});

async function sendEmail(recipient, subject, text) {
  try {
    await transporter.sendMail({
      from: Buffer.from(process.env.NODEMAILER_USER, 'base64').toString('utf-8'),
      to: recipient,
      subject: subject,
      text: text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };