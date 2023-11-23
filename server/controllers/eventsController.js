const nedb = require('gray-nedb');
const eventsDB = new nedb({ filename: "./database/events.db", autoload: true });

// Data Model Classes
const Event = require('./../models/event');

exports.create_new_event = (req, res) => {

    const { eventTitle, eventBanner, description, venue, eventDuration, eventDate, attendeeLimit, eventCategory, createdBy } = req.body;

    const event = new Event(
        eventTitle,
        eventBanner,
        venue,
        description,
        eventDuration,
        eventDate,
        attendeeLimit,
        eventCategory,
        createdBy,
        Date.now()
    )

    eventsDB.insert(event, (err, newEvent) => {
        if (err) {
            console.error(err);
            res.status(417).send({
                message: `Error adding the new event with the name ${newEvent} to the database`,
                timestamp: Date.now()
            })
        } else {
            console.log("Inserted the event document into the database", newEvent);
            res.status(201).send({
                message: 'Successfully added an event to the database',
                resource: newEvent,
                timestamp: Date.now()
            })
        }

    });
}

exports.get_all_events = (req, res) => {

    eventsDB.find({}, (err, events) => {
        if (err) {
            console.error('There was an error retrieving all the events from the database', err);
            res.status(417).send({
                message: `There was an error retrieving all the events from the database. Error: ${err}`,
                timestamp: Date.now()
            })
        }
        else {
            res.status(200).json({
                message : `Successfully retrieved all events from the database`,
                resource: events,
                timestamp: Date.now()
            })
        }
    });
}

exports.get_event_by_id = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    eventsDB.find({ eventId: eventId }, (err, event) => {
        if (err)
            console.error(err);
        else
            if (event.length == 0)
                res.send(`No Event with the id ${eventId} was found in the database.`);
            else
                res.json(event);
    });

}

exports.update_event_by_id = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    const updatedEvent = req.body;

    if (!eventId) return next();

    eventsDB.find({ eventId: eventId }, (err, event) => {

        if (err) {
            console.log(err);
            res.status(400).send({
                error: `No event with the id ${eventId} was found in the database.`,
                timestamp: Date.now()
            })
        }
        else {
            eventsDB.update({ eventId: eventId }, { $set: updatedEvent }, {}, (err, replaced) => {
                if (err)
                    res.status(500).json({
                        error: 'An Internal Error occurred',
                        timestamp: Date.now()
                    })
                else
                    if (replaced == 1)
                        res.status(200).json(updatedEvent);
                    else {
                        res.status(200).send({
                            error: `An Internal Error occurred. Could not update event with Id: ${eventId}`,
                            timestamp: Date.now()
                        })
                    }
            });
        }

    });
}

exports.delete_event_by_id = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    if (!eventId) return next();

    eventsDB.remove({ eventId: eventId }, {}, (err, removedEvent) => {
        if (err) {
            console.log(err);
            res.status(417).json({
                message: `There was an error when deleting event from the database -> ${err}`,
                timestamp: Date.now()
            })
        }
        else {
            if (removedEvent == 1) {
                console.log(`Removed event with ID: ${eventId}`);
                res.status(200).json({
                    message: `The event with the ID ${eventId} was successfully deleted from the database.`,
                    timestamp: Date.now()
                })
            }
            else {
                res.status(500).json({
                    error: `Could not delete event with the ID: ${eventId}. Event does not exist in the database!.`,
                    timestamp: Date.now()
                })
            }
        }
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