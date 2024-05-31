export const data = [
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "What does NoSQL stand for?",
      "correct_answer": "Not Only SQL",
      "incorrect_answers": ["Non-Structured Query Language", "No Structured Query Language", "New SQL"]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "Which of the following is a NoSQL database?",
      "correct_answer": "MongoDB",
      "incorrect_answers": ["MySQL", "PostgreSQL", "Oracle"]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "What is Mongoose?",
      "correct_answer": "An ODM (Object Data Modeling) library for MongoDB and Node.js",
      "incorrect_answers": ["A JavaScript framework", "A CSS preprocessor", "A front-end library"]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "How do you connect to a MongoDB database using Mongoose?",
      "correct_answer": "mongoose.connect('mongodb://localhost/dbname');",
      "incorrect_answers": ["mongoose.connectDB('mongodb://localhost/dbname');", "mongoose.dbConnect('mongodb://localhost/dbname');", "mongoose.mongoConnect('mongodb://localhost/dbname');"]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "Which method is used to create a new document in a Mongoose model?",
      "correct_answer": "Model.create()",
      "incorrect_answers": ["Model.new()", "Model.insert()", "Model.add()"]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "What is the default data format for documents in MongoDB?",
      "correct_answer": "BSON",
      "incorrect_answers": ["JSON", "XML", "CSV"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "How do you define a schema in Mongoose?",
      "correct_answer": "const schema = new mongoose.Schema({ name: String });",
      "incorrect_answers": ["const schema = mongoose.defineSchema({ name: String });", "const schema = mongoose.createSchema({ name: String });", "const schema = new Schema({ name: String });"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "How do you retrieve all documents from a collection in Mongoose?",
      "correct_answer": "Model.find()",
      "incorrect_answers": ["Model.getAll()", "Model.retrieveAll()", "Model.fetchAll()"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "Which method is used to update a document in Mongoose?",
      "correct_answer": "Model.updateOne()",
      "incorrect_answers": ["Model.modifyOne()", "Model.changeOne()", "Model.setOne()"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "What is the purpose of the 'populate' method in Mongoose?",
      "correct_answer": "To replace specified paths in the document with document(s) from other collection(s).",
      "incorrect_answers": ["To create a new collection.", "To aggregate data from multiple collections.", "To validate documents before saving."]
    }
  ]
  