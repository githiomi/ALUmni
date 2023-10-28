// Application Imports
const path = require('path');
const nedb = require("nedb");
const express = require("express");
const date = require("date-and-time");

class Event {

    constructor(
        eventId, eventTitle, venue, shortDescription, details, eventDuration, eventDate, attendeeLimit, eventCategory, createdBy, createdAt
    ){
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.venue = venue;
        this.shortDescription = shortDescription;
        this.details = details;
        this.eventDuration = eventDuration;
        this.eventDate = eventDate;
        this.attendeeLimit = attendeeLimit;
        this.eventCategory = eventCategory;
        this.createdBy = createdBy;
        this.createdAt = Date.now();
    }

}

// Configurations
const app = express();
const public = path.join(__dirname, 'public');

const now = new Date();
const value = date.format(now, "DD/MM/YYYY HH:mm:ss");

app.use(express.urlencoded({ extended: false }));
const database = new nedb({ filename: "./database/events.db", autoload: true });
console.log("The NeDB Events database has been created successfully!");

// Global variables
const PORT_NUMBER = 3000;

app.use((req, res, next) => {
    console.log("Time:", value);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

app.get("/addEvent", (req, res) => {
    const event = new Event(
        'EV001', 'Meet Uber CEO', 'Piazza', 'Come and meet the Uber CEO', 'Come for an interactive session with one of the leading minds...', 1, new Date(2023, 10, 20), 30, 'Professional Development', 'ALU021', Date.now()
    )

    res.send(`Adding new event ${JSON.stringify(event)} to the database`);

    database.insert(event, (err, newEvent) => {
        if (err) {
            console.error(err);
            console.log("Error adding the new event with the name {} to the databse", event.eventTitle);
        } else {
            console.log("Inserted the event document into the database", newEvent);
        }

    })
});

app.get('/events', (req, res) => {

    res.send("Retrieving all events from the database...");

    database.find( {}, (err, events) => {
        if (err) 
            console.error('There was an error retrieving all the events from the database', err);
        else 
            console.log(events);
    });

});

app.get('/events/:eventId', (req, res) => {



});

app.use((req, res) => {
    res.status(404);
    res.send("Oops! 404 Error. No route matches the current one..");
});

app.listen(process.env.port || PORT_NUMBER, (req, res) => {
    console.log(`ALUmni Server Started Successfully on port: ${PORT_NUMBER}. URL: http://localhost:3000.`);
    console.warn('Use Ctrl^c to quit the application.');
});
