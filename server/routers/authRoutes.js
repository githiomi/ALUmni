// Router Imports
const express = require('express');
const authRouter = express.Router();
const { check, validationResult } = require('express-validator');

// Controller Imports
const authController = require('./../controllers/authController');

// Authentication Routes
authRouter.post('/login', [
    check('alumniId').not().isEmpty().trim().escape().withMessage('Alumni Id cannot be empty.'),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 })
], authController.log_in);

// authRouter.post('/register', [
//     check('firstName').not().isEmpty().trim().escape().withMessage('First Name cannot be empty.'),
//     check('lastName').not().isEmpty().trim().escape().withMessage('Last Name cannot be empty.'),
//     check('gender').not().isEmpty().trim().escape().withMessage('Gender cannot be empty.'),
//     check('role').not().isEmpty().trim().escape().withMessage('Role cannot be empty.'),
//     check('age', 'Age should be a number').not().isEmpty().isInt(),
//     check('graduationYear', 'Graduation Year should be a number').not().isEmpty().isInt(),
//     check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
//     check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({ min: 5 }),
//     check('confirmPassword', 'Passwords do not match. Try again.').custom(
//         (value, { req }) => value === req.body.password
//     )
// ], authController.register);

authRouter.post('/register', authController.register);

// Exports
module.exports = authRouter;    