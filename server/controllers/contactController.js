// DAO config
const dao = require('./../daos/contactDAO');

const contactDAO = new dao('messages.db')

exports.postMessage = (req, res) => {

    contactDAO.postMessageToDB(req.body)
        .then((_message) => {
            res.status(201).send({
                message: `Thank you ${_message.firstName} ${_message.lastName}. We will get back to you as soon as possible.`,
                resource: _message,
                timestamp: Date.now()
            })
        })
        .catch(err => {
            console.error(err);
            res.status(400).send({
                message: `Could not add message to the database. ${err}`,
                timestamp: Date.now()
            })
        });

}