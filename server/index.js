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
app.use(bodyParser.urlencoded({ extended: false }));

// Global variables
const PORT_NUMBER = 3001;

// Routers
const alumniRouter = require('./routers/alumniRoutes');
const eventRouter = require('./routers/eventRoutes');
const authRouter = require('./routers/authRoutes');

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: ['http://localhost:4200', 'http://localhost:61561'],
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

// --------------------------------------------------------------------------------------------------------------------

// AUTHENTICATION ROUTES
app.use("/auth", authRouter);

// EVENTS ROUTES
app.use('/events', eventRouter);

// ALUMNI ROUTES
app.use('/alumni', alumniRouter);

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
    console.log(`Server started at: ${value}`);
    console.warn('Use Ctrl^c to quit the application.');
});