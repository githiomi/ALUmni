export interface Alumni {
    alumniId: string;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    age: string;
    profilePictureUrl: string;
    startYear: string;
    endYear: string;
    emailAddress: string;
    role: string;
    password: string;
    eventsToAttend: Event[];
}