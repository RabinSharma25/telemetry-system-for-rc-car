

// request DTO
class UserReq {
    constructor({ firstName, lastName, email,password }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
  }

// Response DTO
  class UserRes {
    constructor({id, firstName,lastName,email,message,success}) {
      this.id =id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.message = message;
      this.success = success;
    }
  }
  
//   module.exports = UserDTO;
  
  module.exports = {UserReq,UserRes};