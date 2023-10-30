// Router Imports
const express = require('express');
const authRouter = express.Router();

// Controller Imports
const authController = require('./../controllers/authController');

// Authentication Routes
authRouter.post('/login', authController.log_in);

authRouter.post('/register', authController.register);

// Exports
module.exports = authRouter;
