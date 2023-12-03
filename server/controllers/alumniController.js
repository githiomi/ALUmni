// Data Access
const dao = require('./../daos/alumniDAO');

// Instantiation
const alumniDAO = new dao('alumni.db');

exports.get_all_alumni = (req, res) => {
    alumniDAO.getAllAlumni()
        .then(_alumni => {
            res.status(200).json({
                message: `Successfully retrieved all alumni from the database`,
                resource: _alumni,
                timestamp: Date.now()
            })
        })
        .catch(err => {
            console.error('There was an error retrieving all the alumni from the database', err);
            res.status(500).send({
                message: `There was an error retrieving all the alumni from the database. Error: ${err}`,
                timestamp: Date.now()
            })
        })
}

exports.get_alumni_by_id = (req, res) => {

    const alumniId = (req.params.alumniId).toUpperCase();

    alumniDAO.getAlumniById(alumniId)
        .then(_foundAlumni => {
            if (_foundAlumni.length > 0)
                res.status(200).json({
                    message: "An Alumni with the ID: " + alumniId + " has been found in the database!",
                    resource: _foundAlumni,
                    timestamp: Date.now()
                })
            else
                res.status(417).json({
                    message: `No user with the id ${alumniId} was found in the database.`,
                    timestamp: Date.now()
                })
        })
        .catch(err => {
            res.status(500).send({
                message: `There was an error retrieving an alumni from the database with id ${alumniId}. Error: ${err}`,
                timestamp: Date.now()
            })
        })

}

exports.update_existing_alumni_by_id = (req, res) => {

    const alumniId = (req.params.alumniId).toUpperCase();

    const updatedAlumni = req.body;

    if (!alumniId) return next();

    alumniDAO.updateExistingAlumni(alumniId, updatedAlumni)
        .then(_updatedStatus => {
            if (_updatedStatus === 1)
                res.status(200).json({
                    message: `Successfully updated the alumni with id: ${alumniId} with new data`,
                    resource: _updatedStatus,
                    timestamp: Date.now()
                })
            else
                res.status(417).json({
                    message: `Unexpected update error. Kindly confirm the alumni id. Received: ${eventId}`,
                    resource: _updatedStatus,
                    timestamp: Date.now()
                })
        })
        .catch(err => {
            res.status(500).send({
                message: `There was an error updating the alumni with id ${eventId} with new data. Error: ${err}`,
                timestamp: Date.now()
            })
        });

}

exports.delete_alumni_by_id = (req, res) => {

    const alumniId = (req.params.alumniId).toUpperCase();

    if (!alumniId) return next();

    alumniDAO.deleteAlumniById(alumniId)
        .then(_deletedStatus => {
            if (_deletedStatus === 1)
                res.status(200).json({
                    message: `Successfully deleted the alumni with id: ${alumniId} from the database.`,
                    resource: _deletedStatus,
                    timestamp: Date.now()
                })
            else
                res.status(417).json({
                    message: `Unexpected deletion error. Could not delete ${alumniId} from the database.`,
                    resource: _deletedStatus,
                    timestamp: Date.now()
                })
        })
        .catch(err => {
            res.status(500).json({
                message: `There was an error deleting the alumni with id: ${alumniId} from the database. Error: ${err}`,
                timestamp: Date.now()
            })
        });
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
                    else {
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