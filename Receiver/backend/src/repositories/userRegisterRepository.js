// src/repositories/userRepository.js
const logger = require('../utils/logger');
const User = require('../models/user');

async function userExists(email) {
  
  // Check if a user with the specified email already exists
  const existingUser= await User.findOne({
    where: { email: email },
  });
  return !!existingUser;
}

async function RegisterUser(userData){
  const email= userData.email;
  logger.info("userRegisterRepository.RegisterUser");
  // Check if the user already exists
  if (await userExists(email)) {
    logger.error("User already exists");
    // throw new Error('User already exists');
    return [null, new Error("User already exists")];
  }

  // logger.info("User register repository");
  const user = await User.create(userData);
  return user,null
}

module.exports = { RegisterUser};