// Database Config
const nedb = require('nedb');
const path = require('path');

// Paths
const DBs = path.join(__dirname, './../database');

class ContactDAO {

    constructor( dbFileName ){
        if ( dbFileName){
            this.contactDB = new nedb({
                filename: path.join(DBs, dbFileName),
                autoload: true  
            })
        }else {
            this.contactDB = new nedb();
        }
    }

    postMessageToDB(message) {

        return new Promise ((resolve, reject) => {
            this.contactDB.insert(message, (err, result) => {
                if (err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = ContactDAO