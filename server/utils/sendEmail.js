const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async ({ from, to, subject, text }) => {
  console.log("sending")

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: "iquest120@gmail.com",
      pass: "uyriwglyhwkecsof"
      },
  });
  const emailObject = {
    from: 'iquest <iquest120@gmail.com>',
    to: to,
    subject: 'Password Reset Request',
    text: 'Please click the link below to reset your password.',
    html: '<p>Please click the link below to reset your password.</p><a href="http://localhost:3000/reset-password">Reset Password</a>'
  };

  const info = await transporter.sendMail(emailObject);
  console.log('sent email:', info)
}

// const sendEmail = async ({ from, to, subject, text }) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     auth: {
//       user: "sunnyside.sacramento@gmail.com",
//       pass: process.env.GAUTH
//       },
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         clientId: process.env.CLIENT,
//         clientSecret: process.env.SECRET,
//     },
//   });
//   transporter.verify(function(error) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("Server is ready to take our messages");
//     }
// });
//   const emailObject = { 
//     from:'"iQuest" <iquestcs@gmail.com>', 
//     to: to,
//     subject: 'Password Reset', 
//     text: `Reset your password by visiting the following link: http://localhost:3000/password-reset-request`,}
//   const info = await transporter.sendMail(emailObject, (err, info) => {
//     if (err) console.log(err);
//     else console.log(info.response);
// });
// };

module.exports = sendEmail;