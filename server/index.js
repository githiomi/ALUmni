// Application Imports
const path = require('path');
const express = require("express");
const date = require("date-and-time");
const bodyParser = require('body-parser');

// Configurations
const app = express();
const public = path.join(__dirname, 'public');
app.use(express.static(public));

const now = new Date();
const value = date.format(now, "DD/MM/YYYY HH:mm:ss");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: false }));

// Global variables
const PORT_NUMBER = 3000;

// Routers
const alumniRouter = require('./routes/alumniRoutes');
const eventRouter = require('./routes/eventRoutes');

app.use((req, res, next) => {
    console.log("Time:", value);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

// --------------------------------------------------------------------------------------------------------------------
// EVENTS
app.post("/newEvent", eventRouter);

app.get('/events', eventRouter);

app.get('/events/:eventId', eventRouter);

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