const db = require('./connection');
// const { User } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {

  // example usage:
  // await cleanDB('User', 'users');
  // await User.create({
  //   firstName: 'test',
  //   lastName: 'test',
  //   email: 'test@gmail.com',
  //   password: 'password',
  //   ]
  // });
  // console.log('users seeded');

  process.exit();
});
