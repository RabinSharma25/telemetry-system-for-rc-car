// src/controllers/userController.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const{ UserReq, UserRes} = require('../dto/userRegisterDTO');
const UserRegisterService = require('../services/userRegisterService');

router.use(bodyParser.json());
router.post('/register', async (req, res) => {
  try {

    let { firstName, lastName, email,password } = req.body;
     password= await UserRegisterService.hashPassword(password);
    console.log(password);
    const userReq = new UserReq({ firstName, lastName, email,password })
    console.log("Input json ");
    console.log(userReq);
    const user = await UserRegisterService.createUser(userReq);



    let id = user.id
    firstName = user.firstName
    lastName = user.lastName
    email = user.email
    let message = "successfully registered"
    let success = true;
    const userRes = new UserRes({id,firstName,lastName,email,message,success})
    console.log(userRes);
    res.status(201).json(userRes);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  } 
});

module.exports = router;
