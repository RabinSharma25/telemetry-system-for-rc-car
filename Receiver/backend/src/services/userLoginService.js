

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace with a secure secret key
const logger = require("../utils/logger");

UserLoginRepository = require('../repositories/userLoginRepository')
async function findUserByEmail(email) {
    logger.info("User login service")
    return UserLoginRepository.findUserByEmail(email);
}



// Function to check if a password matches a hashed password
async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error.message);
    return false;
  }
}

// Function to generate a JWT token
function generateToken(userId) {
  const payload = { userId };
  const options = { expiresIn: '1h' }; // Set the expiration time as needed
  const token = jwt.sign(payload, secretKey, options);
  return token;
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return null;
  }
}

// Function to authenticate a user and generate a JWT token
async function authenticateUser(data) {
  try {
    const user = await findUserByEmail(data.email);
  

    if (user && (await comparePasswords(data.password, user.password))) {
      const token = generateToken(user.id);
      return { user: user.toJSON(), token };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw new Error('Authentication failed: ' + error.message);
  }
}

module.exports = {comparePasswords, generateToken, verifyToken, authenticateUser };