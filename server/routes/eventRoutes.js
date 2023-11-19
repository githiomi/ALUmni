// Routing Imports
const express = require('express');
const eventRouter = express.Router();
const { check, validationResult } = require('express-validator');

// Controller Imports
const eventsController = require('./../controllers/eventsController');

eventRouter.get('/events', eventsController.get_all_events);

eventRouter.post('/events/new', [
    check('eventTitle').not().isEmpty().trim().escape().withMessage('Event Title cannot be empty.'),
    check('eventDescription').not().isEmpty().trim().escape().withMessage('Event Description cannot be empty.'),
    check('venue').not().isEmpty().trim().escape().withMessage('Venue cannot be empty.'),
    check('eventCategory').not().isEmpty().trim().escape().withMessage('Event Category cannot be empty.'),
    check('duration').not().isEmpty().isInt().trim().escape().withMessage('Role cannot be empty.'),
    check('createdBy').not().isEmpty().isInt().trim().escape().withMessage('Created By cannot be empty.'),
    check('atendeeLimit', 'Atendee Limit should be a number').not().isEmpty().isInt(),
], eventsController.create_new_event);

eventRouter.get('/events/:eventId', eventsController.get_event_by_id);

eventRouter.put('/events/:eventId', eventsController.update_event_by_id);

eventRouter.delete('/events/:eventId', eventsController.delete_event_by_id);

eventRouter.get('/events/:eventId/atendees', eventsController.get_atendees_per_event);

eventRouter.post('/events/:eventId/atendees', eventsController.add_atendees_to_event);

function authMiddleware (req, res, next) {

    // Get user login token
    const token = req.headers.get('Authorization').split(' ')[1];

}

// Module Exports
module.exports = eventRouter;