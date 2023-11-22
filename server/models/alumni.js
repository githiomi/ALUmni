const Roles = require('./roles');

let alumniCounter = 1;
const MAX = 101;
const MIN = 0
class Alumnni {

    constructor(
        firstName, lastName, gender, age, graduationYear, emailAddress, role = Roles.alumni, password
    ) {
        this.alumniId = 'ALU0' + alumniCounter;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = this.firstName.charAt(0).toUpperCase() + this.lastName.substring(0, 5).toUpperCase() + Math.floor(Math.random() * (MAX - MIN)) + MIN;
        this.gender = gender;
        this.age = age;
        this.profilePictureUrl = "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg";
        this.startYear = parseInt(graduationYear) - 4;
        this.graduationYear = graduationYear;
        this.emailAddress = emailAddress;
        this.role = role;
        this.password = password;
        this.eventsToAttend = [];

        // Increase counter
        alumniCounter ++;
    }
}

module.exports = Alumnni