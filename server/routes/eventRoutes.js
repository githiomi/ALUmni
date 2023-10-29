// Routing Imports
const express = require('express');
const eventRouter = express.Router();

// Controller Imports
const eventsController = require('./../controllers/eventsController');

eventRouter.post('/newEvent', eventsController.create_new_event);

eventRouter.get('/events', eventsController.get_all_events);

eventRouter.get('/events/:eventId', eventsController.get_event_by_id);

// Module Exports
module.exports = eventRouter;