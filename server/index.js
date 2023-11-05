// Application Imports
const path = require('path');
const cors = require('cors');
const express = require("express");
const date = require("date-and-time");
const bodyParser = require('body-parser');

// Configurations
const app = express();
const public = path.join(__dirname, 'public');
app.use(express.static(public));

const now = new Date();
const value = date.format(now, "DD/MM/YYYY HH:mm:ss");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: false}));

// Global variables
const PORT_NUMBER = 3000;

// Routers
const alumniRouter = require('./routes/alumniRoutes');
const eventRouter = require('./routes/eventRoutes');
const authRouter = require('./routes/authRoutes');

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: 'http://localhost:4200'
}));

app.use((req, res, next) => {
    console.log("Time:", value);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

// --------------------------------------------------------------------------------------------------------------------

// AUTHENTICATION
app.post("/auth/login", authRouter);

app.post('/auth/register', authRouter);

// EVENTS
app.get('/events', eventRouter);

app.post("/events/new", eventRouter);

app.get('/events/:eventId', eventRouter);

app.put('/events/:eventId', eventRouter);

app.delete('/events/:eventId', eventRouter);

app.get('/events/:eventId/atendees', eventRouter);

app.post('/events/:eventId/atendees', eventRouter);

// ALUMNI ROUTES
app.get('/alumni', alumniRouter);

app.get('/alumni/:alumniId', alumniRouter);

app.put('/alumni/:alumniId', alumniRouter);

app.delete('/alumni/:alumniId', alumniRouter);

app.get('/alumni/:alumniId/events', alumniRouter);

app.post('/alumni/:alumniId/events', alumniRouter);

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