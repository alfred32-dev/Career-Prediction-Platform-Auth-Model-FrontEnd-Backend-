const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./auth');
require('./auth');
const User = require('./models/User');

const app = express();

// MongoDB connection
const mongoUri = 'mongodb+srv://alfred:MongoDBPasswordAccess@cluster0.1awwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware setup
app.use(session({
  secret: 'career_advicer_session_secret', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoUri }), // Use MongoDB to store session data
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: false, 
  }
}));

app.use(passport.initialize());
app.use(passport.session()); // Enables persistent login sessions

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

// Register route
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email address is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      email,
      password: hash,
      displayName: email.split('@')[0],
    });

    // Generate a JWT token for the user
    const token = generateToken(user);

    // Return a 201 response with the JWT token
    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (error) {
    // Return a 500 response with the error message
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login route
app.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Return a 500 response with the error message
      return res.status(500).json({ message: 'Error during login', error: err.message });
    }
    if (!user) {
      // Return a 400 response with the error message
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        // Return a 500 response with the error message
        return res.status(500).json({ message: 'Error logging in', error: err.message });
      }
      // Generate a JWT token for the user
      const token = generateToken(user);
      // Return a 200 response with the JWT token
      return res.status(200).json({ message: 'Logged in successfully', token });
    });
  })(req, res, next);
});

// Logout route
app.post('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      // Return a 500 response with the error message
      return res.status(500).json({ message: 'Error during logout', error: err.message });
    }
    // Return a 200 response with the success message
    res.status(200).json({ message: 'Logged out successfully' });
  });
});


app.listen(8080, () => {
  console.log('Authentication service running on port 8080');
});

