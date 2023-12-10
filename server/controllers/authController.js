// Corresponding DB connection
require('dotenv').config();
const bcrypt = require('bcrypt');
const nedb = require('gray-nedb');
const jwt = require('jsonwebtoken');
const alumniDB = new nedb({ filename: "./database/alumni.db", autoload: true });

// Data Models
const Alumni = require('./../models/alumni');

exports.log_in = (req, res) => {

    const { username, password } = req.body;

    // Find the user from the database
    alumniDB.find({ username: username }, async (err, alumni) => {

        if (err)
            res.status(500).json({
                message: 'An Internal Error occurred',
                timestamp: Date.now()
            })
        else if (alumni.length === 0)
            res.status(401).json({
                message: `There is no user with the username: "${req.body.username}"`,
                timestamp: Date.now()
            });
        else {
            if (await bcrypt.compare(password, alumni[0].password)){

                const alum = alumni[0];

                // Authentication using JWT
                const payload = {
                    alumniId : alum.alumniId,
                    username : alum.username,
                    role : alum.role
                }

                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

                res.status(200).json({
                    message: `Login Successful. Welcome ${alum.firstName}`,
                    accessToken : accessToken,
                    resource : {
                        alumniId :alum.alumniId,
                        username : alum.username,
                        role : alum.role,
                        profilePictureUrl : alum.profilePictureUrl
                    },
                    timestamp: Date.now()
                })
            }
            else
                res.status(401).json({
                    message: `Incorrect Password. Authentication failed. Try Again.`,
                    timestamp: Date.now()
                });
        }
    });
}

exports.register = async (req, res) => {

    const { firstName, lastName, gender, age, graduationYear, emailAddress, role, password } = req.body;

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

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
                message: 'An Internal Error occurred',
                timestamp: Date.now()
            });
        else
            res.status(200).json({
                message : 'The new user was created successfully',
                resource : newAlum,
                timestamp: Date.now()
            });
    });

}