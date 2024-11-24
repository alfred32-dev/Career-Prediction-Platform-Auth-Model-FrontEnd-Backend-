const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Configure passport to use local strategy for authentication
passport.use(new LocalStrategy({
    usernameField: 'email', // Use 'email' as the username field
    passwordField: 'password' // Use 'password' as the password field
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      // Authentication successful
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize user ID into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session using the user ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Function to generate a JWT for a user
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email }, // Payload
    'career_advicer_jwt_secretkey', // Secret key
    { expiresIn: '1h' } // Token expiration
  );
}

module.exports = { generateToken };

