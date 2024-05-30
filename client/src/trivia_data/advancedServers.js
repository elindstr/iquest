export const data = [
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is Apollo?",
        "correct_answer": "A platform for building GraphQL APIs",
        "incorrect_answers": ["A CSS framework", "A frontend library", "A database management system"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "Which package is used to integrate Apollo with React?",
        "correct_answer": "apollo-client",
        "incorrect_answers": ["apollo-server", "apollo-database", "apollo-redux"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "What is the purpose of Apollo Server?",
        "correct_answer": "To create a GraphQL server",
        "incorrect_answers": ["To manage database connections", "To handle authentication", "To serve static files"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is GraphQL?",
        "correct_answer": "A query language for APIs",
        "incorrect_answers": ["A database", "A CSS framework", "A templating engine"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "Which company developed GraphQL?",
        "correct_answer": "Facebook",
        "incorrect_answers": ["Google", "Microsoft", "Twitter"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "What is the root query type in GraphQL?",
        "correct_answer": "Query",
        "incorrect_answers": ["Root", "Main", "Base"]
    },
    {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Web Development",
    "question": "What are type definitions (typeDefs) in GraphQL?",
    "correct_answer": "They define the schema of the GraphQL API",
    "incorrect_answers": ["They handle HTTP requests", "They define the database schema", "They configure middleware"]
    },
    {
    "type": "multiple",
    "difficulty": "medium",
    "category": "Web Development",
    "question": "Which language is used to write type definitions in GraphQL?",
    "correct_answer": "GraphQL Schema Definition Language (SDL)",
    "incorrect_answers": ["JavaScript", "TypeScript", "JSON"]
    },
    {
    "type": "multiple",
    "difficulty": "hard",
    "category": "Web Development",
    "question": "How do you define a Query type in typeDefs?",
    "correct_answer": "type Query { ... }",
    "incorrect_answers": ["typeDefs Query { ... }", "queryType { ... }", "schema Query { ... }"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "What are type definitions (typeDefs) in GraphQL?",
        "correct_answer": "They define the schema of the GraphQL API",
        "incorrect_answers": ["They handle HTTP requests", "They define the database schema", "They configure middleware"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "Which language is used to write type definitions in GraphQL?",
        "correct_answer": "GraphQL Schema Definition Language (SDL)",
        "incorrect_answers": ["JavaScript", "TypeScript", "JSON"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "How do you define a Query type in typeDefs?",
        "correct_answer": "type Query { ... }",
        "incorrect_answers": ["typeDefs Query { ... }", "queryType { ... }", "schema Query { ... }"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "What is the role of resolvers in GraphQL?",
        "correct_answer": "To provide the logic for fetching data based on a query",
        "incorrect_answers": ["To define the schema", "To manage client-side state", "To handle HTTP requests"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "How do you define a resolver for a query named 'getUser'?",
        "correct_answer": "getUser: (parent, args, context, info) => { ... }",
        "incorrect_answers": ["getUser: (args, context) => { ... }", "resolveGetUser: (args) => { ... }", "query getUser { ... }"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "What arguments do resolvers typically receive?",
        "correct_answer": "parent, args, context, info",
        "incorrect_answers": ["root, params, ctx, details", "parent, params, context, data", "ancestor, arguments, ctx, meta"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is a query in GraphQL?",
        "correct_answer": "A read-only operation to fetch data",
        "incorrect_answers": ["A write operation to update data", "A subscription to data changes", "A mutation for data"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "How do you define a query named 'allUsers'?",
        "correct_answer": "query { allUsers { ... } }",
        "incorrect_answers": ["fetch { allUsers { ... } }", "select { allUsers { ... } }", "query allUsers { ... }"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "Which directive is used to include or skip fields conditionally in a query?",
        "correct_answer": "@include or @skip",
        "incorrect_answers": ["@if or @else", "@show or @hide", "@display or @omit"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is a mutation in GraphQL?",
        "correct_answer": "An operation to modify data",
        "incorrect_answers": ["An operation to fetch data", "An operation to subscribe to data changes", "An operation to delete data"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "How do you define a mutation named 'createUser'?",
        "correct_answer": "mutation { createUser { ... } }",
        "incorrect_answers": ["mutate { createUser { ... } }", "action { createUser { ... } }", "update { createUser { ... } }"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "What is the main difference between queries and mutations in GraphQL?",
        "correct_answer": "Queries are read-only, mutations modify data",
        "incorrect_answers": ["Queries are synchronous, mutations are asynchronous", "Queries are for single records, mutations are for multiple records", "Queries use POST, mutations use GET"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What does JWT stand for?",
        "correct_answer": "JSON Web Token",
        "incorrect_answers": ["JavaScript Web Token", "Java Web Token", "JSON Wireless Token"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is JWT primarily used for?",
        "correct_answer": "Authentication and information exchange",
        "incorrect_answers": ["Data storage", "File transfer", "Logging"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "Which library is commonly used to handle JWTs in Node.js?",
        "correct_answer": "jsonwebtoken",
        "incorrect_answers": ["jwt-handler", "node-jwt", "jwt-utils"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is bcrypt used for?",
        "correct_answer": "Hashing passwords",
        "incorrect_answers": ["Encrypting data", "Managing sessions", "Validating tokens"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "Which function in bcrypt is used to hash a password?",
        "correct_answer": "bcrypt.hash()",
        "incorrect_answers": ["bcrypt.encrypt()", "bcrypt.salt()", "bcrypt.passwordHash()"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "Which function in bcrypt is used to compare a plain text password with a hashed password?",
        "correct_answer": "bcrypt.compare()",
        "incorrect_answers": ["bcrypt.validate()", "bcrypt.check()", "bcrypt.verify()"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is middleware in Express.js?",
        "correct_answer": "Functions that execute during the request-response cycle",
        "incorrect_answers": ["Functions that manage database connections", "Functions that handle client-side rendering", "Functions that define routes"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "How do you define middleware in an Express.js application?",
        "correct_answer": "app.use((req, res, next) => { ... })",
        "incorrect_answers": ["app.middleware((req, res) => { ... })", "app.route((req, res, next) => { ... })", "app.function((req, res, next) => { ... })"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "What is the purpose of the 'next' function in Express middleware?",
        "correct_answer": "To pass control to the next middleware function",
        "incorrect_answers": ["To terminate the request-response cycle", "To handle errors", "To render a view"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is the purpose of dotenv in a Node.js application?",
        "correct_answer": "To load environment variables from a .env file",
        "incorrect_answers": ["To manage session data", "To connect to a database", "To handle routing"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "How do you load environment variables using dotenv?",
        "correct_answer": "require('dotenv').config()",
        "incorrect_answers": ["require('dotenv').load()", "dotenv.config()", "dotenv.load()"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "Where do you typically store sensitive information like API keys in a Node.js application?",
        "correct_answer": "In environment variables managed by dotenv",
        "incorrect_answers": ["In the source code", "In a JSON file", "In a database"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What does CORS stand for?",
        "correct_answer": "Cross-Origin Resource Sharing",
        "incorrect_answers": ["Cross-Origin Request Security", "Client-Origin Resource Sharing", "Client-Origin Request Security"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What problem does CORS solve?",
        "correct_answer": "It allows restricted resources on a web page to be requested from another domain",
        "incorrect_answers": ["It manages user sessions", "It encrypts data", "It handles file uploads"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "How do you enable CORS in an Express.js application?",
        "correct_answer": "Using the 'cors' middleware",
        "incorrect_answers": ["Using the 'cors' package", "Using the 'express-cors' package", "By setting a CORS header manually"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is Heroku?",
        "correct_answer": "A cloud platform as a service (PaaS)",
        "incorrect_answers": ["A database", "A frontend framework", "A version control system"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "Which command is used to deploy an application to Heroku?",
        "correct_answer": "git push heroku main",
        "incorrect_answers": ["heroku deploy", "heroku push main", "git deploy heroku main"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "How do you set environment variables in Heroku?",
        "correct_answer": "Using the 'heroku config:set' command",
        "incorrect_answers": ["Using a .env file", "Directly in the code", "Using the 'heroku env' command"]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "Web Development",
        "question": "What is Render?",
        "correct_answer": "A cloud platform for deploying web applications",
        "incorrect_answers": ["A frontend framework", "A database service", "A version control system"]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Web Development",
        "question": "How do you deploy an application to Render?",
        "correct_answer": "By connecting a GitHub repository and following Render's deployment steps",
        "incorrect_answers": ["By using the 'render deploy' command", "By uploading a zip file", "By using FTP"]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Web Development",
        "question": "How do you manage environment variables in Render?",
        "correct_answer": "Through the Render dashboard under the Environment tab",
        "incorrect_answers": ["Using a .env file", "Directly in the code", "Using the 'render env' command"]
    }
]



