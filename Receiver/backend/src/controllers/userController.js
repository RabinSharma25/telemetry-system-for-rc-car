// src/controllers/userController.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const{ UserReq, UserRes} = require('../dto/userDTO');
const UserService = require('../services/userService');

router.use(bodyParser.json());
router.post('/users', async (req, res) => {
  try {


    let { firstName, lastName, email } = req.body;
    const userReq = new UserReq({ firstName, lastName, email })
    const user = await UserService.createUser(userReq);

    console.log("Input json ");
    console.log(userReq);

    let id = user.id
    firstName = user.firstName
    lastName = user.lastName
    email = user.email
    const userRes = new UserRes({id,firstName,lastName,email})
    console.log(userRes);
    res.status(201).json(userRes);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  } 
});

module.exports = router;
