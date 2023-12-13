// Router Imports
const express = require('express');
const alumniRouter = express.Router();

// Controller Imports
const alumniController = require('./../controllers/alumniController');
const eventsController = require('./../controllers/eventsController');

alumniRouter.get('/', alumniController.get_all_alumni);

alumniRouter.get('/:alumniId', alumniController.get_alumni_by_id);

alumniRouter.put('/:alumniId', alumniController.update_existing_alumni_by_id);

alumniRouter.delete('/:alumniId', alumniController.delete_alumni_by_id);

alumniRouter.get('/:alumniId/events', authMiddleware, eventsController.get_events_for_alumni);

alumniRouter.post('/:alumniId/events', alumniController.add_event_to_alumni);

// Middlewares
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

// Export
module.exports = alumniRouter;