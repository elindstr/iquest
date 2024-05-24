const db = require('./connection');
const { User, Quiz } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users')

    const ericData = await User.create({
      email: "elindstr@gmail.com",
      firstName: "Eric",
      lastName: "Lindstrom",
      profileBio: "Hi!",
      profilePictureURL: "/seeds-uploads/eric.jpg",
      iq: 120,
      password: "password",
      friends: []
    });
    const bradenData = await User.create({
      email: "braden@gmail.com",
      firstName: "Braden",
      lastName: "Natali",
      profileBio: "Hi!",
      profilePictureURL: "/seeds-uploads/braden.jpg",
      iq: 200,
      password: "password",
      friends: [ericData.id]
    });
    const jacobData = await User.create({
      email: "jacob@gmail.com",
      firstName: "Jacob",
      lastName: "Higham",
      profileBio: "Hi!",
      profilePictureURL: "/seeds-uploads/jacob.jpeg",
      iq: 160,
      password: "password",
      friends: [bradenData.id, ericData.id]
    });
    const beavisData = await User.create({
      email: "beavis@gmail.com",
      firstName: "Beavis",
      lastName: ".",
      profileBio: "Hi!",
      profilePictureURL: "/seeds-uploads/beavis.png",
      iq: 40,
      password: "password",
      friends: [bradenData.id, jacobData.id, ericData.id]
    });
    const buttheadData = await User.create({
      email: "butthead@gmail.com",
      firstName: "Butthead",
      lastName: ".",
      profileBio: "Hi!",
      profilePictureURL: "/seeds-uploads/butthead.png",
      iq: 100,
      password: "password",
      friends: [beavisData.id, bradenData.id, ericData.id, jacobData.id]
    });
    console.log('user data seeded');

    //console.log("test:", ericData)
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
    const quizData = await Quiz.insertMany(quizzes);
    console.log('quiz data seeded');
    // console.log(quizData)

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});
