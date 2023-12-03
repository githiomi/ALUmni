// Router Imports
const express = require('express');
const alumniRouter = express.Router();

// Controller Imports
const alumniController = require('./../controllers/alumniController');
const eventsController = require('./../controllers/eventsController');

alumniRouter.get('/', alumniController.get_all_alumni);

alumniRouter.get('/:alumniId', alumniController.get_alumni_by_id);

// alumniRouter.put('/:alumniId', isAuthenticated, alumniController.update_existing_alumni_by_id);
alumniRouter.put('/:alumniId', alumniController.update_existing_alumni_by_id);

alumniRouter.delete('/:alumniId', alumniController.delete_alumni_by_id);

alumniRouter.get('/:alumniId/events', eventsController.get_events_for_alumni);

alumniRouter.post('/:alumniId/events', alumniController.add_event_to_alumni);

const isAuthenticated = () => { return true };

// Export
module.exports = alumniRouter;