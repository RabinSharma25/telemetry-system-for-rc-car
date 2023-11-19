class LoginReq{
constructor({email,password}){
this.email = email;
this.password = password;
}
}

class LoginRes{
constructor({ message, success,jwt}){

    this.message = message;
    this.success = success;
    this.jwt = jwt
}
}


module.exports = {LoginReq,LoginRes};