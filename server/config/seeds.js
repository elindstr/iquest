const db = require('./connection');
const { User, Quiz } = require('../models');
const cleanDB = require('./cleanDB');
const bcrypt = require('bcrypt');

(async () => {
  try {
    const getNewIQ = (await import('../../client/src/components/getNewIQ.js')).default;
    db.once('open', async () => {
      try {

        // seed user data
        await cleanDB('User', 'users');
        const password = await bcrypt.hash("password", 10);
        const users = [
          {
            email: "elindstr@gmail.com",
            firstName: "Eric",
            lastName: "Lindstrom",
            profileBio: "Hi!",
            profilePictureURL: "/seeds-uploads/eric.jpg",
            iq: 120,
            password: password,
            friends: []
          },
          {
            email: "braden@gmail.com",
            firstName: "Braden",
            lastName: "Natali",
            profileBio: "Hi!",
            profilePictureURL: "/seeds-uploads/braden.jpg",
            iq: 120,
            password: password,
            friends: []
          },
          {
            email: "jacob@gmail.com",
            firstName: "Jacob",
            lastName: "Higham",
            profileBio: "Hi!",
            profilePictureURL: "/seeds-uploads/jacob.jpg",
            iq: 120,
            password: password,
            friends: []
          },
          {
            email: "tcampbell_93@hotmail.com",
            firstName: "Tyler",
            lastName: "Campbell",
            profileBio: "Hi!",
            profilePictureURL: "/seeds-uploads/tyler.jpg",
            iq: 120,
            password: password,
            friends: []
          },
          {
            email: "gavin@gmail.com",
            firstName: "Gavin",
            lastName: "Todd",
            profileBio: "Hi!",
            profilePictureURL: "/seeds-uploads/gavin.png",
            iq: 120,
            password: password,
            friends: []
          },
          {
            email: "beavis@gmail.com",
            firstName: "Beavis",
            lastName: ".",
            profileBio: "Hi!",
            profilePictureURL: "/seeds-uploads/beavis.png",
            iq: 100,
            password: password,
            friends: []
          },
          {
            email: "butthead@gmail.com",
            firstName: "Butthead",
            lastName: ".",
            profileBio: "Hi!",
            profilePictureURL: "/seeds-uploads/butthead.png",
            iq: 50,
            password: password,
            friends: []
          }
        ];
        const createdUsers = await User.insertMany(users);
        console.log('user data seeded');

        // seed friend data
        const [ericData, bradenData, jacobData, tylerData, gavinData, beavisData, buttheadData] = createdUsers;

        ericData.friends = [bradenData._id, jacobData._id, tylerData._id];
        await ericData.save();
        bradenData.friends = [ericData._id, jacobData._id, tylerData._id];
        await bradenData.save();
        jacobData.friends = [bradenData._id, ericData._id];
        await jacobData.save();
        tylerData.friends = [bradenData._id, ericData._id];
        await tylerData.save();
        gavinData.friends = [bradenData._id, ericData._id, jacobData._id, tylerData._id];
        await gavinData.save();

        beavisData.friends = [bradenData._id, jacobData._id, ericData._id];
        await beavisData.save();

        buttheadData.friends = [beavisData._id, bradenData._id, ericData._id, jacobData._id];
        await buttheadData.save();

        // seed quiz data
        await cleanDB('Quiz', 'quiz');
        const numberOfQuizzes = 24;
        for (let user of createdUsers) {
          let currentIQ = user.iq;

          for (let i = 0; i < numberOfQuizzes; i++) {
            const quizResult = Math.random() * 0.5 + 0.4; // Random result between 40% and 90%
            const newIQ = getNewIQ(currentIQ, quizResult);

            const quiz = {
              user: user._id,
              difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
              count: Math.floor(Math.random() * 20) + 5,
              category: ["science", "history", "music", "sports", "any"][Math.floor(Math.random() * 5)],
              percentCorrect: quizResult,
              newIQ: newIQ
            };

            // save quiz result
            await Quiz.create(quiz);

            // update user iq
            currentIQ = newIQ;
            user.iq = currentIQ;
            await user.save();
          }
        }

        console.log('quiz data seeded');
        process.exit();
      } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Error importing getNewIQ:', error);
    process.exit(1);
  }
})();
