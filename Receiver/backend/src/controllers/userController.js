// src/controllers/userController.js

const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');

router.post('/users', async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

module.exports = router;
