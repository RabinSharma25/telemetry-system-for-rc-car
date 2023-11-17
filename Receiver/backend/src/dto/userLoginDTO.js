class LoginReq{
constructor({email,password}){
this.email = email;
this.password = password;
}
}

class LoginRes{
constructor({name, message, success}){
    this.name = name;
    this.message = message;
    this.success = success;
}
}


module.exports = {LoginReq,LoginRes};