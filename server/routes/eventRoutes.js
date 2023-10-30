// Routing Imports
const express = require('express');
const eventRouter = express.Router();

// Controller Imports
const eventsController = require('./../controllers/eventsController');

eventRouter.get('/events', eventsController.get_all_events);

eventRouter.post('/events/new', eventsController.create_new_event);

eventRouter.get('/events/:eventId', eventsController.get_event_by_id);

eventRouter.get('/events/:eventId/atendees', eventsController.get_atendees_per_event);

eventRouter.post('/events/:eventId/atendees', eventsController.add_atendees_to_event);

// Module Exports
module.exports = eventRouter;