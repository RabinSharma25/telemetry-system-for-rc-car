// src/controllers/userLoginController.js

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// const cookieParser = require('cookie-parser');

const UserLoginService = require('../services/userLoginService');
const logger = require("../utils/logger");
router.use(bodyParser.json());
// router.use(cookieParser());

// logger.info("User login controller");
async function LoginUser(req, res) {
    logger.info("User login controller.")
    console.log(req.body);
    const [result, err] = await UserLoginService.LoginUser(req.body);

    if (err != null) {
        res.status(500).json(result)
        return 0;
    }
    res.status(200).json(result);
    return 0;

}



module.exports = { LoginUser };