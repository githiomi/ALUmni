const Roles = require('./roles');
let alumniCounter = 1;
const MAX = 101;
const MIN = 0
class Alumnni {

    constructor(
        firstName, lastName, gender, age, profilePictureUrl, startYear, endYear, emailAddress, role = Roles.alumni, password
    ) {
        this.alumniId = 'ALU0' + alumniCounter;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = this.firstName.charAt(0).toUpperCase() + this.lastName.substring(0, 5).toUpperCase() + Math.floor(Math.random() * (MAX - MIN)) + MIN
        this.gender = gender;
        this.age = age;
        this.profilePictureUrl = profilePictureUrl;
        this.startYear = startYear;
        this.endYear = endYear;
        this.emailAddress = emailAddress;
        this.role = role;
        this.password = password;
        this.eventsToAttend = [];

        // Increase counter
        alumniCounter += 1;
    }
}

module.exports = Alumnni