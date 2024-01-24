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

    postMessageToDB({firstName, lastName, emailAddress, message}) {

        return new Promise = (resolve, reject) => {
            this.contactDB.p
        }
    }

}