[
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "What is Express.js?",
      "correct_answer": "A web application framework for Node.js.",
      "incorrect_answers": ["A database management system.", "A frontend library.", "A CSS framework."]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "Which command is used to install Express.js?",
      "correct_answer": "npm install express",
      "incorrect_answers": ["npm install express.js", "npm get express", "npm init express"]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Web Development",
      "question": "Which method is used to define a route in Express.js?",
      "correct_answer": "app.get()",
      "incorrect_answers": ["app.route()", "app.setRoute()", "app.define()"]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "How do you handle a POST request in Express.js?",
      "correct_answer": "app.post('/path', (req, res) => {});",
      "incorrect_answers": ["app.handle('/path', 'POST', (req, res) => {});", "app.onPost('/path', (req, res) => {});", "app.route('/path', 'POST', (req, res) => {});"]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "What is middleware in Express.js?",
      "correct_answer": "Functions that execute during the lifecycle of a request to the Express server.",
      "incorrect_answers": ["A module that connects Express to a database.", "A method to define routes.", "A function to handle errors."]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Web Development",
      "question": "How do you serve static files in Express.js?",
      "correct_answer": "app.use(express.static('public'));",
      "incorrect_answers": ["app.serveStatic('public');", "app.setStatic('public');", "app.static('public');"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "How do you handle errors in Express.js?",
      "correct_answer": "By defining an error-handling middleware function.",
      "incorrect_answers": ["By using try-catch blocks in each route.", "By restarting the server on each error.", "By logging errors to the client console."]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "Which object is used to manage routes in Express.js?",
      "correct_answer": "Router",
      "incorrect_answers": ["RouteManager", "RouteHandler", "RouteController"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "How do you parse JSON request bodies in Express.js?",
      "correct_answer": "app.use(express.json());",
      "incorrect_answers": ["app.use(json());", "app.use(express.bodyParser());", "app.use(express.parseJSON());"]
    },
    {
      "type": "multiple",
      "difficulty": "hard",
      "category": "Web Development",
      "question": "Which method is used to listen for connections in an Express.js app?",
      "correct_answer": "app.listen()",
      "incorrect_answers": ["app.connect()", "app.bind()", "app.onListen()"]
    }
  ]
  