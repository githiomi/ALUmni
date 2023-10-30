// Router Imports
const express = require('express');
const alumniRouter = express.Router();

// Controller Imports
const alumniController = require('./../controllers/alumniController');

alumniRouter.get('/alumni', alumniController.get_all_alumni);

alumniRouter.get('/alumni/:alumniId', alumniController.get_alumni_by_id);

alumniRouter.get('/alumni/:alumniId/events', alumniController.get_alumni_events);

alumniRouter.post('/alumni/:alumniId/events', alumniController.add_event_to_alumni);

// Export
module.exports = alumniRouter;