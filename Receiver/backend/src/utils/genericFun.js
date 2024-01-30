const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace with a secure secret key
const saltRounds = 10;

async function hashPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error.message);
      return false;
    }
  }


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

  async function comparePasswords(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error.message);
    return false;
  }
}
  module.exports = {hashPassword,verifyToken,generateToken,comparePasswords}