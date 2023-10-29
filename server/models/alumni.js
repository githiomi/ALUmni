class Alumnni {

    MAX = 101;
    MIN = 0

    constructor(
        alumniId, firstName, lastName, gender, age, profilePictureUrl, startYear, endYear, emailAddress, role, password, confirmPassword
    ) {
        this.alumniId = alumniId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = this.firstName.charAt(0).toUpperCase() + this.lastName.substring(0, 5).toUpperCase() + Math.floor(Math.random() * (this.MAX - this.MIN)) + this.MIN
        this.gender = gender;
        this.age = age;
        this.profilePictureUrl = profilePictureUrl;
        this.startYear = startYear;
        this.endYear = endYear;
        this.emailAddress = emailAddress;
        this.role = role;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}

module.exports = Alumnni