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

    const eventId = req.params.eventId;

    eventsDB.find( { eventId: eventId }, (err, event) => {
        if (err)
            console.error(err);
        else
            res.json(event)   
    });

}