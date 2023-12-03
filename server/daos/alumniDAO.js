// Imports
const nedb = require('nedb');

// Database
const path = require('path');
const DBs = path.join(__dirname, './../database');

class AlumniDAO {

    constructor(dbFileName) {
        if (dbFileName) {
            // Embedded database
            this.alumniDb = new nedb({
                filename: path.join(DBs, dbFileName),
                autoload: true
            })
        }
        else {
            // In memory database
            this.alumniDb = new nedb();
        }
    }

    getAllAlumni() {
        return new Promise((resolve, reject) => {
            this.alumniDb.find({}, (err, _alumni) => {
                if (err)
                    reject(err);
                else
                    resolve(_alumni)
            });
        });
    }

    getAlumniById(alumniId) {
        return new Promise((resolve, reject) => {
            this.alumniDb.find({ 'alumniId': alumniId }, (err, _foundAlumni) => {
                if (err)
                    reject(err)
                else
                    resolve(_foundAlumni)
            });
        });
    }

    updateExistingAlumni(alumniId, updatedAlumni) {
        return new Promise((resolve, reject) => {
            this.alumniDb.update({ alumniId: alumniId }, { $set: updatedAlumni }, {}, (err, _updated) => {
                if (err)
                    reject(err);
                else
                    resolve(_updated);
            })
        })
    }

    deleteAlumniById(alumniId) {
        return new Promise((resolve, reject) => {
            this.alumniDb.remove({ alumniId: alumniId }, {}, (err, _removedAlumni) => {
                if (err)
                    reject(err);
                else
                    resolve(_removedAlumni)
            })
        });
    }

}

module.exports = AlumniDAO;