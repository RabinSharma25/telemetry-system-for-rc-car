// src/services/userService.js

const UserRegisterRepository = require('../repositories/userRegisterRepository');

class UserService {
  static async createUser(userData) {
    return UserRegisterRepository.createUser(userData);
  }

  // Implement other business logic here
}

module.exports = UserService;