
UserLoginRepository = require('../repositories/userLoginRepository')
async function findUserByEmail(email) {
    return UserLoginRepository.findUserByEmail(email);
}

async function hashPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error.message);
      return false;
    }
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

module.exports = {findUserByEmail, hashPassword ,comparePasswords}