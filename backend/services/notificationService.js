exports.sendEmail = (to, subject, message) => {
  // Example: nodemailer / third-party service
  console.log(`Email sent to ${to}`);
};

exports.sendSMS = (phone, message) => {
  // Example: Twilio / Fast2SMS
  console.log(`SMS sent to ${phone}`);
};
