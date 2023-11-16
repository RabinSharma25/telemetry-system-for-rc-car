// src/repositories/userRepository.js
const logger = require('../utils/logger'); // Import your logger configuration

const User = require('../models/user');

class UserRepository {
  static async createUser(userData) {
    logger.info("UserRepository\n");
    const user = await User.create(userData);
    // console.log(user.firstName);
    // const { id, fName, lName, eml } = user;

    // Return the information as an object
    // return { id, fName,lName, eml };;
    return user;
  }

  // Implement other database operations here
}

module.exports = UserRepository;



// console.log("this is the value return by user",user);
// console.log(user.firstName);
// const { id, firstName, lastName, email } = user;

// // Return the information as an object
// return { id, firstName,lastName, email };
