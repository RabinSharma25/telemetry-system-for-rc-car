// src/controllers/userController.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const UserRegisterService = require('../services/userRegisterService');
const logger = require("../utils/logger");
router.use(bodyParser.json());
const {validationResult} = require('express-validator')


async function RegisterUser ( req, res ) {

logger.info("User register controller");

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }

    const [result, err]= await UserRegisterService.RegisterUser(req.body);
    if(err!=null) {
      res.status(500).json(result)
      return 0;
    }
    res.status(201).json({
      id:result.id,
      firstName:result.firstName,
      lastName:result.lastName,
      message:"Successfully registered"

    });

}

module.exports = {RegisterUser};
