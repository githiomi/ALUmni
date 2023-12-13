// Routing Imports
const express = require('express');
const jwt = require('jsonwebtoken');
const eventRouter = express.Router();
const { check, validationResult } = require('express-validator');

// Controller Imports
const eventsController = require('./../controllers/eventsController');

// eventRouter.get('/events', authMiddleware, eventsController.get_all_events);
eventRouter.get('/', eventsController.get_all_events);

// eventRouter.post('/new', [
//     check('eventTitle').not().isEmpty().trim().escape().withMessage('Event Title cannot be empty.'),
//     check('eventDescription').not().isEmpty().trim().escape().withMessage('Event Description cannot be empty.'),
//     check('venue').not().isEmpty().trim().escape().withMessage('Venue cannot be empty.'),
//     check('eventCategory').not().isEmpty().trim().escape().withMessage('Event Category cannot be empty.'),
//     check('duration').not().isEmpty().isInt().trim().escape().withMessage('Role cannot be empty.'),
//     check('createdBy').not().isEmpty().isInt().trim().escape().withMessage('Created By cannot be empty.'),
//     check('atendeeLimit', 'Atendee Limit should be a number').not().isEmpty().isInt(),
// ], eventsController.create_new_event);

eventRouter.post('/new', eventsController.create_new_event);

eventRouter.get('/:eventId', eventsController.get_event_by_id);

eventRouter.put('/:eventId', eventsController.update_event_by_id);

eventRouter.delete('/:eventId', eventsController.delete_event_by_id);

// eventRouter.get('/:eventId/atendees', eventsController.get_atendees_per_event);

// eventRouter.post('/:eventId/atendees', eventsController.add_atendees_to_event);

// Module Exports
module.exports = eventRouter;