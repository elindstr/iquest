const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const imageUploadRoute = require('./utils/imageUploadRoute');
const cors = require('cors');
const env = require('dotenv').config({ path: './.env'});
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
})

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { User } = require('./models');
const crypto = require('crypto');
const sendEmail = require('./utils/sendEmail');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    token: req.headers.authorization || '',
  }),
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
  app.use('/seeds-uploads', express.static(path.join(__dirname, '../client/public/seeds-uploads')));

  // Password reset endpoints
  app.post('/api/request-password-reset', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const resetToken = user.createPasswordResetToken();


      const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
        console.log(user)
      await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        text: `Reset your password by visiting the following link: ${resetURL}`,
      });

      await user.save();

      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error sending email', error });
    }
  });

  app.post('/api/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
      }

      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
      res.status(500).json({ message: 'Error resetting password', error });
    }
  });

  // Use Apollo GraphQL middleware
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));

  // Get stripe API key from .env and send to front end
  app.get('/api/config', (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });

  // post payment requests from stripe
  app.post('/api/create-payment-intent', async (req, res) => {
    try {
      const paymentIntent = await Stripe.paymentIntents.create({
        currency: 'usd',
        amount: 1999,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });

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
