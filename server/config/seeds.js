const db = require('./connection');
const { User, Quiz } = require('../models');
const cleanDB = require('./cleanDB');
const bcrypt = require('bcrypt');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    password = await bcrypt.hash("password", 10);

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
        iq: 200,
        password: password,
        friends: []
      },
      {
        email: "jacob@gmail.com",
        firstName: "Jacob",
        lastName: "Higham",
        profileBio: "Hi!",
        profilePictureURL: "/seeds-uploads/jacob.jpg",
        iq: 160,
        password: password,
        friends: []
      },
      {
        email: "beavis@gmail.com",
        firstName: "Beavis",
        lastName: ".",
        profileBio: "Hi!",
        profilePictureURL: "/seeds-uploads/beavis.png",
        iq: 40,
        password: password,
        friends: []
      },
      {
        email: "butthead@gmail.com",
        firstName: "Butthead",
        lastName: ".",
        profileBio: "Hi!",
        profilePictureURL: "/seeds-uploads/butthead.png",
        iq: 100,
        password: password,
        friends: []
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('user data seeded');

    // Create friends relationships
    const [ericData, bradenData, jacobData, beavisData, buttheadData] = createdUsers;

    ericData.friends = [bradenData._id];
    await ericData.save();

    bradenData.friends = [ericData._id];
    await bradenData.save();

    jacobData.friends = [bradenData._id, ericData._id];
    await jacobData.save();

    beavisData.friends = [bradenData._id, jacobData._id, ericData._id];
    await beavisData.save();

    buttheadData.friends = [beavisData._id, bradenData._id, ericData._id, jacobData._id];
    await buttheadData.save();

    await cleanDB('Quiz', 'quiz');

    const quizzes = [
      {
        user: ericData._id,
        difficulty: "any",
        count: 10,
        category: "any",
        percentCorrect: 0.5
      },
      {
        user: bradenData._id,
        difficulty: "hard",
        count: 15,
        category: "science",
        percentCorrect: 0.8
      },
      {
        user: jacobData._id,
        difficulty: "medium",
        count: 20,
        category: "history",
        percentCorrect: 0.7
      },
      {
        user: beavisData._id,
        difficulty: "easy",
        count: 5,
        category: "music",
        percentCorrect: 0.2
      },
      {
        user: buttheadData._id,
        difficulty: "medium",
        count: 10,
        category: "sports",
        percentCorrect: 0.6
      }
    ];

    await Quiz.insertMany(quizzes);
    console.log('quiz data seeded');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});
