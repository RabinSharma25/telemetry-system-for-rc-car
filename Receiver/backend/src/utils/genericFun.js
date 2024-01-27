const bcrypt = require('bcrypt');
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

  module.exports = {hashPassword}