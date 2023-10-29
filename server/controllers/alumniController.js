// Corresponding DB connection
const nedb = require('gray-nedb');
const alumniDB = new nedb({ filename: "./database/alumni.db", autoload: true });

// Data Models
const Alumni = require('./../models/alumni');
const Roles = require('./../models/roles');

exports.new_alum = (req, res) => {

    const alum = new Alumni(
        'ALU001',
        "John",
        "Doe",
        "Male",
        28,
        "https://example.com/profile.jpg",
        2010,
        2014,
        "johndoe@example.com",
        Roles.alumni,
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

};

exports.get_all_alumni = (req, res) => {

    alumniDB.find({}, (err, alumni) => {
        if (err)
            console.error(err);
        else {
            if (alumni.length > 0)
                res.json(alumni);
            else
                res.send("No users found in the database.");
        }
    });

}