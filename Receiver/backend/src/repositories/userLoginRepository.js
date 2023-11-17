const logger = require('../utils/logger'); // Import your logger configuration

// services/userService.js

const User = require('../models/user');

// Function to find a user by email
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      return user // Return the user if found
    } else {
      throw new Error('User not found'); // Throw an error if user is not found
    }
  } catch (error) {
    throw new Error('Error finding user by email: ' + error.message); // Throw an error if any other error occurs
  }
}

module.exports = { findUserByEmail };