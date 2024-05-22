const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const imageUploadRoute = require('./utils/imageUploadRoute');
const cors = require('cors'); // Import CORS middleware

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();

  // Middleware for JSON, URL encoding, etc.
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Enable CORS
  app.use(cors()); // Use CORS middleware

  // Use the upload route
  app.use(imageUploadRoute);

  // Serve static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));
  app.use('/uploads', express.static(path.join(__dirname, '../client/public/uploads')));

  // Use Apollo GraphQL middleware
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
