// src/repositories/userRepository.js
const logger = require('../utils/logger'); // Import your logger configuration

const User = require('../models/user');

class UserRegisterRepository {
  static async createUser(userData) {
    
    logger.info("User register repository");
    const user = await User.create(userData);
    return user;
  }

}

module.exports = UserRegisterRepository;
