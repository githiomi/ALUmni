// Routing Imports
const express = require('express');
const jwt = require('jsonwebtoken');
const eventRouter = express.Router();
const { check, validationResult } = require('express-validator');

// Controller Imports
const eventsController = require('./../controllers/eventsController');

// eventRouter.get('/events', authMiddleware, eventsController.get_all_events);
eventRouter.get('/events', eventsController.get_all_events);

// eventRouter.post('/events/new', [
//     check('eventTitle').not().isEmpty().trim().escape().withMessage('Event Title cannot be empty.'),
//     check('eventDescription').not().isEmpty().trim().escape().withMessage('Event Description cannot be empty.'),
//     check('venue').not().isEmpty().trim().escape().withMessage('Venue cannot be empty.'),
//     check('eventCategory').not().isEmpty().trim().escape().withMessage('Event Category cannot be empty.'),
//     check('duration').not().isEmpty().isInt().trim().escape().withMessage('Role cannot be empty.'),
//     check('createdBy').not().isEmpty().isInt().trim().escape().withMessage('Created By cannot be empty.'),
//     check('atendeeLimit', 'Atendee Limit should be a number').not().isEmpty().isInt(),
// ], eventsController.create_new_event);

eventRouter.post('/events/new', eventsController.create_new_event);

eventRouter.get('/events/:eventId', eventsController.get_event_by_id);

eventRouter.put('/events/:eventId', eventsController.update_event_by_id);

eventRouter.delete('/events/:eventId', eventsController.delete_event_by_id);

eventRouter.get('/events/:eventId/atendees', eventsController.get_atendees_per_event);

eventRouter.post('/events/:eventId/atendees', eventsController.add_atendees_to_event);

function authMiddleware(req, res, next) {

    // Get user login token
    const authToken = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    console.log('Auth token: ' + authToken);

    if (!authToken || authToken == null)
        return res.status(401).json({
            error: 'No Authorization Header was found in the request!',
            timestamp: Date.now()
        })

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err)
            return res.status(403).json({
                error: "Authorization Token passed but is no longer valid. Refresh Token and try again",
                timestamp: Date.now()
            })

        req.authorisedUser = payload;
        res.status(200).send(req.authorisedUser)
        next();
    });
}

// Module Exports
module.exports = eventRouter;