// Application Imports
const path = require('path');
const nedb = require("gray-nedb");
const express = require("express");
const date = require("date-and-time");
const bodyParser = require('body-parser');
const Event = require('./models/event');
const eventCategories = require('./models/eventCategories');

// Configurations
const app = express();
const public = path.join(__dirname, 'public');
app.use(express.static(public));

const now = new Date();
const value = date.format(now, "DD/MM/YYYY HH:mm:ss");

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.urlencoded({ extended: false }));
const eventsDB = new nedb({ filename: "./database/events.db", autoload: true });
console.log("The NeDB Events database has been created successfully!");

// Global variables
const PORT_NUMBER = 3000;

// Routers
const alumniRouter = require('./routes/alumniRoutes');

app.use((req, res, next) => {
    console.log("Time:", value);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

// --------------------------------------------------------------------------------------------------------------------
// EVENTS
app.post("/addEvent", (req, res) => {
    const event = new Event(
        'EV001', 'Meet Uber CEO', 'Piazza', 'Come and meet the Uber CEO', 'Come for an interactive session with one of the leading minds...', 1, new Date(2023, 10, 20), 30, eventCategories.networking, 'ALU021', Date.now()
    )

    res.send(`Adding new event ${JSON.stringify(event)} to the database`);

    eventsDB.insert(event, (err, newEvent) => {
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

    eventsDB.find({}, (err, events) => {
        if (err)
            console.error('There was an error retrieving all the events from the database', err);
        else
            console.log(events);
    });

});

app.get('/events/:eventId', (req, res) => {

    const eventId = req.params.eventId;

    eventsDB.find( { eventId: eventId }, (err, event) => {
        if (err)
            console.error(err);
        else
            res.json(event)   
    });

});

// ALUMNI ROUTES
app.post('/newAlum', alumniRouter);

app.get('/alumni', alumniRouter)

// --------------------------------------------------------------------------------------------------------------------
app.get('/close', function (req, res) {
    db.close((err) => {
        if (err) {
            res.send('There is some error in closing the database');
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
        res.send('Database connection successfully closed');
    });
});

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(public, 'error.html'));
});

app.listen(process.env.port || PORT_NUMBER, (req, res) => {
    console.log(`ALUmni Server Started Successfully on port: ${PORT_NUMBER}. URL: http://localhost:${PORT_NUMBER}.`);
    console.warn('Use Ctrl^c to quit the application.');
});