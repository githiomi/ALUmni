const nedb = require('gray-nedb');
const eventsDB = new nedb({ filename: "./database/events.db", autoload: true });

// Data Model Classes
const Event = require('./../models/event');
const EventCategory = require('./../models/eventCategories');

exports.create_new_event = (req, res) => {
    const event = new Event(
        'EV001',
        'Meet Uber CEO',
        'Piazza',
        'Come and meet the Uber CEO',
        'Come for an interactive session with one of the leading minds...',
        1,
        new Date(2023, 10, 20),
        30,
        EventCategory.networking,
        'ALU021',
        Date.now()
    )

    console.log(`Adding new event ${JSON.stringify(event)} to the database`);

    eventsDB.insert(event, (err, newEvent) => {
        if (err) {
            console.error(err);
            console.log("Error adding the new event with the name {} to the databse", newEvent);
        } else {
            console.log("Inserted the event document into the database", newEvent);
            res.json(newEvent)
        }

    });
}

exports.get_all_events = (req, res) => {

    console.log("Retrieving all events from the database...");

    eventsDB.find({}, (err, events) => {
        if (err)
            console.error('There was an error retrieving all the events from the database', err);
        else {
            res.json(events)
        }
            console.log(events);
    });

}

exports.get_event_by_id = (req, res) => {

    const eventId = (req.params.eventId).toUpperCase();

    eventsDB.find( { eventId: eventId }, (err, event) => {
        if (err)
            console.error(err);
        else
            if (event.length == 0)
                res.send(`No Event with the id ${eventId} was found in the database.`);
            else
                res.json(event);
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

    const eventId = (req.params.eventId).toUpperCase();

    if (!eventId) return next();

    eventsDB.find({ eventId: eventId }, (err, events) => {
        if (err)
            console.error(err);
        else {
            if (events.length > 0) {
                const event = events[0]

                let updatedEvent = {
                    ...event,
                    atendees: [...event.atendees, "ALU01"]
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
                res.send(`There is no user with the id: "${eventId}"`)
        }
    })
}