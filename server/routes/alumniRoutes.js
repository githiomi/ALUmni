// Router Imports
const express = require('express');
const alumniRouter = express.Router();

// Controller Imports
const alumniController = require('./../controllers/alumniController');

alumniRouter.get('/alumni', alumniController.get_all_alumni);

alumniRouter.post('/newAlum', alumniController.new_alum);

// Export
module.exports = alumniRouter;