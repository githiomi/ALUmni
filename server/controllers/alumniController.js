// Corresponding DB connection
const nedb = require('gray-nedb');
const alumniDB = new nedb({ filename: "./database/alumni.db", autoload: true });

exports.get_all_alumni = (req, res) => {

    alumniDB.find({}, (err, alumni) => {
        if (err)
            console.error(err);
        else {
            if (alumni)
                res.json(alumni);
            else
                res.send("No users found in the database.");
        }
    });

};

exports.get_alumni_by_id = (req, res) => {

    const alumId = (req.params.alumniId).toUpperCase();

    alumniDB.find({ alumniId: alumId }, (err, alumni) => {
        if (err)
            console.error(err);
        else {
            if (alumni.length > 0)
                res.json(alumni)
            else
                res.send(`No user with the id "${alumId}" was found in the database.`)
        }
    })

}

exports.get_alumni_events = (req, res) => {

    const alumId = (req.params.alumniId).toUpperCase();
    
    if (!alumId) return next();

    alumniDB.find({ alumniId: alumId }, (err, alumni) => {
        if (err)
            console.error(err);
        else {
            if (alumni[0].eventsToAttend.length > 0)
                res.json(alumni[0].eventsToAttend)
            else
                res.send(`There are no events that ${alumni[0].username} has signed up for.`)
        }
    })

}

exports.add_event_to_alumni = (req, res) => {

    const alumId = (req.params.alumniId).toUpperCase();

    const { events } = req.body;

    if (!alumId) return next();

    alumniDB.find({ alumniId: alumId }, (err, alumni) => {
        if (err)
            console.error(err);
        else {
            if (alumni.length > 0) {
                const alum = alumni[0]
                const hashedAlumId = alum._id;

                let updatedAlum = {
                    ...alum,
                    eventsToAttend: [...alum.eventsToAttend, ...events]
                }

                alumniDB.update({ _id: hashedAlumId }, { $set: updatedAlum }, {}, (err, replaced) => {
                    if (err)
                        res.status(500).json({
                            error: 'An Internal Error occurred',
                            timestamp: Date.now()
                        })
                    else{
                        res.status(200).json(updatedAlum);
                        console.log(replaced);
                    }
                });
            }
            else
                res.send(`There is no user with the id: "${alumId}"`)
        }
    })

}