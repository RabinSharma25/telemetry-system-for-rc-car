// src/routes/api.js

const express = require('express');
const userRegisterController = require('../controllers/userRegisterController');
const userLoginController = require('../controllers/userLoginController')
const logger = require("../utils/logger");
const {signUpValidation} = require("../validators/validator")

const router = express.Router();

router.use('/register', signUpValidation,userRegisterController);
router.use('/login',userLoginController);
logger.info("Routes loaded successfully");
module.exports = router;