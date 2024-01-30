// src/controllers/userController.js

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { LoginReq, LoginRes } = require('../dto/userLoginDTO');
const UserLoginService = require('../services/userLoginService');
const logger = require("../utils/logger");
router.use(bodyParser.json());
router.use(cookieParser());

// logger.info("User login controller");
async function LoginUser(req, res) {
    logger.info("User login controller.")

    const [result, err] = await UserLoginService.LoginUser(req.body);

    if (err != null) {
        res.status(500).json(result)
        return 0;
    }
    res.status(201).json(result);
    return 0;

}



module.exports = { LoginUser };