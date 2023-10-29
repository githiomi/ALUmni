const Roles = require('./roles');
const MAX = 101;
const MIN = 0
class Alumnni {

    constructor(
        alumniId, firstName, lastName, gender, age, profilePictureUrl, startYear, endYear, emailAddress, role = Roles.alumni, password, confirmPassword
    ) {
        this.alumniId = alumniId;
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
        this.confirmPassword = confirmPassword;
        this.eventsToAttend = [];
    }
}

module.exports = Alumnni