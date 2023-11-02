// Corresponding DB connection
const nedb = require('gray-nedb');
const alumniDB = new nedb({ filename: "./database/alumni.db", autoload: true });

// Data Models
const Alumni = require('./../models/alumni');
const Roles = require('./../models/roles');

exports.log_in = (req, res) => {

    const { username, password } = req.body;

    // Find the user from the database
    alumniDB.find({ username: username }, (err, alumni) => {

        if (err)
            res.status(500).json({
                error: 'An Internal Error occurred',
                timestamp: Date.now()
            })
        else if (alumni.length === 0)
            res.status(401).json({
                error: `There is no user with the username: "${req.body.username}"`,
                timestamp: Date.now()
            });
        else
            if (alumni[0].password !== password)
                res.status(401).json({
                    error: `Invalid Username or Password. Try Again.`,
                    timestamp: Date.now()
                });
            else
                res.status(200).json({
                    success: `Login Successful`,
                    timestamp: Date.now()
                })
    });

}

exports.register = (req, res) => {

    const { firstName, lastName, gender, age, graduationYear, emailAddress, role, password } = req.body;

    const alum = new Alumni(
        firstName,
        lastName,
        gender,
        age,
        graduationYear,
        emailAddress,
        role,
        password
    );

    alumniDB.insert(alum, (err, newAlum) => {
        if (err)
            res.status(500).json({
                error: 'An Internal Error occurred',
                timestamp: Date.now()
            });
        else
            res.status(200).json(newAlum);
    });

}