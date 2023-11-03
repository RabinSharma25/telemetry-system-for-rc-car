// src/repositories/userRepository.js
const logger = require('../utils/logger'); // Import your logger configuration

const User = require('../models/user');

class UserRepository {
  static async createUser(userData) {
    logger.info("UserRepository\n");
    return User.create(userData);
  }

  // Implement other database operations here
}

module.exports = UserRepository;