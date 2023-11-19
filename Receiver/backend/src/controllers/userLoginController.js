// src/controllers/userController.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { LoginReq, LoginRes } = require('../dto/userLoginDTO');
const UserLoginService = require('../services/userLoginService');

router.use(bodyParser.json());
router.use(cookieParser());
router.post('/login', async (req, res) => {
    try {

        let { email, password } = req.body;
        let message, success,jwt;
        const loginReq = new LoginReq({ email, password })


        const authResult = await UserLoginService.authenticateUser(loginReq);


        if (authResult) {
            const { token } = authResult;
            res.cookie('jwt', token, { httpOnly: true });
            success = true;
            message = "Suuccessfully logged in";
            jwt = token
            const loginRes = new LoginRes({message,success,jwt})
            res.json(loginRes);
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    }

    // console.log("Input json ");
    // console.log(loginReq);

    // id = user.id
    // firstName = user.firstName
    // lastName = user.lastName
    // name = firstName + " " + lastName
    // let eml = user.email
    // let passwrd = user.password
    // success = true;
    // message = "Successfully Logged in"

    // const isMatch =  UserLoginService.comparePasswords(password,passwrd);
    // if(isMatch){
    // const loginRes = new LoginRes({ name, message, success });
    // console.log(loginRes);
    // res.status(201).json(loginRes);
    // }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

module.exports = router;