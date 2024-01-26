// src/services/userService.js

const UserRegisterRepository = require('../repositories/userRegisterRepository');
const logger = require("../utils/logger")
const bcrypt = require('bcrypt');
const saltRounds = 10;

  async function  createUser(userData) {
    logger.info("User register service");
    return await UserRegisterRepository.createUser(userData)
  }
  // Implement other business logic here


async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error.message);
    return false;
  }
}
module.exports ={ createUser,hashPassword};