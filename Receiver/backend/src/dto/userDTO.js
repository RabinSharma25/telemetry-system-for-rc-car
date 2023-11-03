

// request DTO
class CreateUserDTO {
    constructor({ firstName, lastName, email }) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }

// Response DTO
  class UserDTO {
    constructor(userModel) {
      this.id = userModel.id;
      this.firstName = userModel.firstName;
      this.lastName = userModel.lastName;
      this.email = userModel.email;
    }
  }
  
//   module.exports = UserDTO;
  
  module.exports = CreateUserDTO,UserDTO;