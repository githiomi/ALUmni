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
        this.profilePictureUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F26619142-default-avatar-profile-icon-vector-of-social-media-user-photo-image&psig=AOvVaw3K8ksj0n4xFeE9_KD5FRvV&ust=1698997009532000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIibgp3npIIDFQAAAAAdAAAAABAE";
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