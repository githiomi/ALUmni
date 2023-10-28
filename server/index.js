// Application Imports
const path = require('path');
const express = require("express");
const date = require("date-and-time");

// Configurations
const app = express();
const public = path.join(__dirname, 'public');
const now = new Date();
const value = date.format(now, "DD/MM/YYYY HH:mm:ss");

// Global variables
const PORT_NUMBER = 3000;

app.use((req, res, next) => {
    console.log("Time:", value);
    next();
});

app.get("/", (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});

app.use((req, res) => {
    res.status(404);
    res.send("Oops! 404 Error. No route matches the current one..");
});

app.listen(process.env.port || PORT_NUMBER, (req, res) => {
    console.log(`ALUmni Server Started Successfully on port: ${PORT_NUMBER}. URL: http://localhost:3000.`);
    console.warn('Use Ctrl^c to quit the application.');
});
