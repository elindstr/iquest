const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async ({ from, to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: process.env.CLIENT,
        clientSecret: process.env.SECRET,
    },
  });
  transporter.verify(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});
  const emailObject = { 
    from:'"iQuest" <iquestcs@gmail.com>', 
    to: to,
    subject: 'Password Reset', 
    text: `Reset your password by visiting the following link: http://localhost:3000/password-reset-request`,}
  const info = await transporter.sendMail(emailObject, (err, info) => {
    if (err) console.log(err);
    else console.log(info.response);
});
};

module.exports = sendEmail;