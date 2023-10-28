// Application Imports
const path = require('path');
const nedb = require("nedb");
const express = require("express");
const date = require("date-and-time");

class Event {

    constructor(
        eventId, eventTitle, venue, shortDescription, details, eventDuration, eventDate, attendeeLimit, eventCategory, createdBy
    ) {
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

class ALUmnni {

    MAX = 101;
    MIN = 0

    constructor(
        alumniId, firstName, lastName, gender, age, profilePictureUrl, startYear, endYear, emailAddress, role, password, confirmPassword
    ) {
        this.alumniId = alumniId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = this.firstName.charAt(0).toUpperCase() + this.lastName.substring(0, 5).toUpperCase() + Math.floor(Math.random() * (this.MAX - this.MIN)) + this.MIN
        this.gender = gender;
        this.age = age;
        this.profilePictureUrl = profilePictureUrl;
        this.startYear = startYear;
        this.endYear = endYear;
        this.emailAddress = emailAddress;
        this.role = role;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}

const EventCategories = {
    professional : 'Professional Development',
    networking : 'Networking',
    campus : 'Campus Event'
}

// Configurations
const app = express();
const public = path.join(__dirname, 'public');

const now = new Date();
const value = date.format(now, "DD/MM/YYYY HH:mm:ss");

app.use(express.urlencoded({ extended: false }));
const eventsDB = new nedb({ filename: "./database/events.db", autoload: true });
const alumniDB = new nedb({ filename: "./database/alumni.db", autoload: true });
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

// EVENTS
app.post("/addEvent", (req, res) => {
    const event = new Event(
        'EV001', 'Meet Uber CEO', 'Piazza', 'Come and meet the Uber CEO', 'Come for an interactive session with one of the leading minds...', 1, new Date(2023, 10, 20), 30, EventCategories.networking, 'ALU021', Date.now()
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
    
});

// USERS
app.post('/addUser', (req, res) => {

    const alum = new ALUmnni(
        'ALU001',
        "John",
        "Doe",
        "Male",
        28,
        "https://example.com/profile.jpg",
        2010,
        2014,
        "johndoe@example.com",
        "alumni",
        "password123",
        "password123"
    );

    res.send(`Creating a new user and adding it to the database. ${JSON.stringify(alum)}`);

    alumniDB.insert(alum, (err, newAlum) => {
        if (err)
            console.error('There was an error inserting the new user into the database', err);
        else
            console.log('Added new user to the database', newAlum);
    });
});

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
    res.send("Oops! 404 Error. No route matches the current one..");
});

app.listen(process.env.port || PORT_NUMBER, (req, res) => {
    console.log(`ALUmni Server Started Successfully on port: ${PORT_NUMBER}. URL: http://localhost:${PORT_NUMBER}.`);
    console.warn('Use Ctrl^c to quit the application.');
});
