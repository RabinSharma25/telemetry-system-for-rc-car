// src/services/userService.js

const UserRepository = require('../repositories/userRepository');

class UserService {
  static async createUser(userData) {
    return UserRepository.createUser(userData);
  }

  // Implement other business logic here
}

module.exports = UserService;