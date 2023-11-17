// src/routes/api.js

const express = require('express');
const userRegisterController = require('../controllers/userRegisterController');
const userLoginController = require('../controllers/userLoginController')

const router = express.Router();

router.use('/register', userRegisterController);
router.use('/login',userLoginController);

module.exports = router;