const nodemailer = require('nodemailer');

exports.sendMail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'ReachOut CEO <reachOut@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  await transporter.sendMail(mailOptions);
};
