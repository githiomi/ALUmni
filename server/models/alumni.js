let alumniCounter = 1;
const MAX = 101;
const MIN = 1;
class Alumnni {

    constructor(
        firstName, lastName, gender, age, graduationYear, emailAddress, role = Roles.alumni, password
    ) {
        this.alumniId = 'ALU00' + alumniCounter;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = this.firstName.charAt(0).toUpperCase() + this.lastName.substring(0, 4).toUpperCase() + Math.floor(Math.random() * (MAX - MIN)) + MIN;
        this.gender = gender;
        this.age = age;
        this.profilePictureUrl = this.assignProfilePicture(gender);
        this.startYear = parseInt(graduationYear) - 4;
        this.graduationYear = graduationYear;
        this.emailAddress = emailAddress;
        this.role = role;
        this.password = password;
        this.eventsToAttend = [];

        // Increase counter
        alumniCounter ++;
    }

    assignProfilePicture(gender){
        if (gender == 'MALE'){
            return 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-male-icon.png';
        }else if (gender == 'FEMALE'){
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3BbsAWKX2VvKuN2QEaMChKuKsr6bKLjwlsfboCnu9CQ0AdQI7ltq4-t7g9rnaDm8IgaE&usqp=CAU'
        }
    }
}

module.exports = Alumnni