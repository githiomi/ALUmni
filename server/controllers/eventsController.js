// Data Access
const dao = require('./../daos/eventDAO');

// Instantiation
const eventDAO = new dao('events.db');

// Data Model Classes
const Event = require('./../models/event');

exports.create_new_event = (req, res) => {

    const { eventTitle, eventBanner, eventDescription, venue, eventDuration, eventDate, attendeeLimit, eventCategory, createdBy } = req.body;

    const event = new Event(
        eventTitle,
        eventBanner,
        eventDescription,
        venue,
        eventDuration,
        eventDate,
        attendeeLimit,
        eventCategory,
        createdBy
    )

    eventDAO.createNewEvent(event)
        .then(_newEvent => {
            res.status(201).send({
                message: `Successfully added an event with title ${_newEvent.eventTitle} to the database`,
                resource: _newEvent,
                timestamp: Date.now()
            })
        })
        .catch(err => {
            console.error(err);
            res.status(417).send({
                message: `Error adding the new event to the database`,
                timestamp: Date.now()
            })
        });

}

exports.get_all_events = (req, res) => {
    eventDAO.getAllEvents()
        .then(_events => {
            res.status(200).json({
                message: `Successfully retrieved all events from the database`,
                resource: _events,
                timestamp: Date.now()
            })
        })
        .catch(err => {
            res.status(500).send({
                message: `There was an error retrieving all the events from the database. Error: ${err}`,
                timestamp: Date.now()
            })
        })
}

exports.get_event_by_id = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    eventDAO.getEventById(eventId)
        .then(_event => {
            if (_event.length == 0)
                res.status(404).send({
                    message: `No event with the id: ${eventId} was found on the database.`,
                    timestamp: Date.now()
                })
            else
                res.status(200).json({
                    message: `Successfully retrieved the event with id: ${eventId} from the database`,
                    resource: _event,
                    timestamp: Date.now()
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: `There was an error retrieving the event with id ${eventId} from the database. Error: ${err}`,
                timestamp: Date.now()
            })
        });

}

exports.get_events_for_alumni = (req, res) => {

    const alumni = req.authorisedUser;

    eventDAO.getAlumniEvents(alumni.username)
        .then(_events => {
            if (_events.length == 0)
                res.status(200).send({
                    message: `No event was found on the database for user: ${alumni.alumniId}.`,
                    resource: [],
                    timestamp: Date.now()
                })
            else
                res.status(200).json({
                    message: `Successfully retrieved the events for the user: ${alumni.alumniId}`,
                    resource: _events,
                    timestamp: Date.now()
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: `There was an error retrieving the events for user ${alumni.alumniId} from the database. Error: ${err}`,
                timestamp: Date.now()
            })
        });

}

exports.update_event_by_id = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    const updatedEvent = req.body;

    if (!eventId) return next();

    eventDAO.updateExistingEvent(eventId, updatedEvent)
        .then(_updatedStatus => {
            if (_updatedStatus === 1)
                res.status(200).json({
                    message: `Successfully updated the event with id: ${eventId} with new data`,
                    resource: _updatedStatus,
                    timestamp: Date.now()
                })
            else
                res.status(417).json({
                    message: `Unexpected update error. Kindly confirm the event id. Received: ${eventId}`,
                    resource: _updatedStatus,
                    timestamp: Date.now()
                })
        })
        .catch(err => {
            res.status(500).send({
                message: `There was an error updating the event with id ${eventId} with new data. Error: ${err}`,
                timestamp: Date.now()
            })
        });
}

exports.delete_event_by_id = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    if (!eventId) return next();

    eventDAO.deleteEventById(eventId)
        .then(_deletedStatus => {
            if (_deletedStatus === 1)
                res.status(200).json({
                    message: `Successfully deleted the event with id: ${eventId} from the database.`,
                    resource: _deletedStatus,
                    timestamp: Date.now()
                })
            else
                res.status(417).json({
                    message: `Unexpected deletion error. Could not delete ${eventId} from the database.`,
                    resource: _deletedStatus,
                    timestamp: Date.now()
                })
        })
        .catch(err => {
            res.status(500).json({
                message: `There was an error deleting event with id: ${eventId} from the database. Error: ${err}`,
                timestamp: Date.now()
            })
        });
}

exports.get_atendees_per_event = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    if (!eventId) return next();

    eventsDB.find({ eventId: eventId }, (err, event) => {
        if (err)
            console.error(err);
        else {
            if (event[0].atendees.length > 0)
                res.json(event[0].atendees)
            else
                res.send(`There are no attendees that signed up for "${event[0].eventTitle}".`)
        }
    })
}

exports.add_atendees_to_event = (req, res) => {

    const {
        atendees
    } = req.body;

    const eventId = (req.params.eventId).toUpperCase();

    if (!eventId) return next();

    eventsDB.find({ eventId: eventId }, (err, events) => {
        if (err)
            console.error(err);
        else {
            if (events.length > 0) {
                const event = events[0];

                let updatedEvent = {
                    ...event,
                    atendees: [...event.atendees, ...atendees],
                }

                eventsDB.update({ eventId: eventId }, { $set: updatedEvent }, {}, (err, replaced) => {
                    if (err)
                        res.status(500).json({
                            error: 'An Internal Error occurred',
                            timestamp: Date.now()
                        })
                    else
                        res.status(200).json(updatedEvent);
                });
            }
            else
                res.send(`No event with the id: ${eventId} was found in the database`);
        }
    })
}