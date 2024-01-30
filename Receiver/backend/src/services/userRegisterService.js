// src/services/userService.js

const UserRegisterRepository = require('../repositories/userRegisterRepository');
const logger = require("../utils/logger")
const randomstring = require('randomstring');
const sendMail = require("../utils/mail");
const utils = require("../utils/genericFun")


async function RegisterUser(userData) {


  pass = await utils.hashPassword(userData.password);
  userData.password = pass;


  logger.info("User register service");
const [res, err] = await UserRegisterRepository.RegisterUser(userData)
  if (err != null) {
    return [{
      Success: false,
      Message: err.message
    }, err]
  }

  let mailSubject = "Mail Verification";
  const randomToken = randomstring.generate();
  let content = "<p> Hii " + userData.firstName + ", please <a href='www.google.com'>Verify</a>";
  sendMail(userData.email, mailSubject, content)

  return [res,null]




}
// Implement other business logic here



module.exports = { RegisterUser };