// Corresponding DB connection
require('dotenv').config();
const bcrypt = require('bcrypt');
const nedb = require('gray-nedb');
const jwt = require('jsonwebtoken');
const alumniDB = new nedb({ filename: "./database/alumni.db", autoload: true });

// Data Models
const Alumni = require('./../models/alumni');
const Roles = require('./../models/roles');

exports.log_in = (req, res) => {

    const { username, password } = req.body;

    // Find the user from the database
    alumniDB.find({ username: username }, async (err, alumni) => {

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
        else {
            if (await bcrypt.compare(password, alumni[0].password)){

                // Authentication using JWT
                const payload = {
                    alumniId : alumni[0].alumniId,
                    username : alumni[0].username,
                    role : alumni[0].role
                }

                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

                res.status(200).json({
                    success: `Login Successful`,
                    accessToken : accessToken,
                    timestamp: Date.now()
                })
            }
            else
                res.status(401).json({
                    error: `Incorrect Password. Authentication failed. Try Again.`,
                    timestamp: Date.now()
                });
        }
    });

}

exports.register = async (req, res) => {

    const { firstName, lastName, gender, age, graduationYear, emailAddress, role, password } = req.body;

    // Password hashing
    const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const alum = new Alumni(
        firstName,
        lastName,
        gender,
        age,
        graduationYear,
        emailAddress,
        role,
        hashedPassword
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