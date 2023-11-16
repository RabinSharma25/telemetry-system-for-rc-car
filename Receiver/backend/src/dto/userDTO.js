

// request DTO
class UserReq {
    constructor({ firstName, lastName, email }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }

// Response DTO
  class UserRes {
    constructor({id, firstName,lastName,email}) {
      this.id =id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }
  
//   module.exports = UserDTO;
  
  module.exports = {UserReq,UserRes};