
const logger = require("../utils/logger");
const utils = require("../utils/genericFun")

const UserLoginRepository = require('../repositories/userLoginRepository')

// Function to check if a password matches a hashed password


async function LoginUser(userData){
logger.info("userLoginService.LoginUser")
// const pass = await utils.hashPassword(userData.password);
// console.log(userData.password);
// console.log(pass);
const [res,err] = await UserLoginRepository.LoginUser (userData.email,userData.password);

if(err!=null){
  return [{
    Success:false,
    Message:"Login failed "+ err.message
  },err]
}

const token = utils.generateToken(res.id);

return[{
  Success:true,
  Message:"Successfully logged In",
  jwtToken:token
},null]

}
module.exports = {LoginUser} ;