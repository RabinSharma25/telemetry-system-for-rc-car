const logger = require('../utils/logger'); // Import your logger configuration

const User = require('../models/user');
// const { Utils } = require('sequelize');
const utils = require("../utils/genericFun")

// Function to find a user by email
async function LoginUser(email, password) {
  logger.info("User login repository");
  console.log(password);

  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (user) {
    console.log(password);
    console.log(user.password);
    const val = await utils.comparePasswords(password,user.password);
    if (val){
      logger.info("Successfully logged In")
      return [user, null] // Return the user if found
    }

  } else {
    logger.error("Login Failed");
    return [null, new Error('Incorrect password or email')]; // Throw an error if user is not found
  }

}
module.exports = { LoginUser };


