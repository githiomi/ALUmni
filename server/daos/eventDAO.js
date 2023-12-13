// imports
const nedb = require('nedb');
const path = require('path');
const DBs = path.join(__dirname, './../database');

class EventDAO {

    constructor(dbFileName) {
        if (dbFileName)
            this.eventDB = new nedb({
                filename: path.join(DBs, dbFileName),
                autoload: true
            })
        else
            this.eventDB = new nedb();
    }

    createNewEvent(newEvent) {
        return new Promise((resolve, reject) => {
            this.eventDB.insert(newEvent, (err, _newEvent) => {
                if (err)
                    reject(err);
                else
                    resolve(_newEvent);
            })
        });
    }

    getAllEvents() {
        return new Promise((resolve, reject) => {
            this.eventDB.find({}, (err, _events) => {
                if (err)
                    reject(err);
                else
                    resolve(_events);
            })
        })
    }

    getEventById(eventId) {
        return new Promise((resolve, reject) => {
            this.eventDB.find({ eventId: eventId }, (err, _events) => {
                if (err)
                    reject(err);
                else {
                    resolve(_events);
                }
            })
        })
    }

    getAlumniEvents(alumniId) {
        return new Promise((resolve, reject) => {
            this.eventDB.find({ createdBy: alumniId }, (err, _events) => {
                if (err)
                    reject(err);
                else {
                    console.log(_events);
                    resolve(_events);
                }
            })
        })
    }

    updateExistingEvent(eventId, updatedEvent) {
        return new Promise((resolve, reject) => {
            this.eventDB.update({ eventId: eventId }, { $set: updatedEvent }, {}, (err, _updated) => {
                if (err)
                    reject(err);
                else
                    resolve(_updated);
            })
        })
    }

    deleteEventById(eventId) {
        return new Promise((resolve, reject) => {
            this.eventDB.remove({ eventId: eventId }, {}, (err, _removedEvent) => {
                if (err)
                    reject(err);
                else
                    resolve(_removedEvent)
            })
        });
    }

}

module.exports = EventDAO;