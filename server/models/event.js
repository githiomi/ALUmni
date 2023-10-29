class Event {

    constructor(
        eventId, eventTitle, venue, shortDescription, details, eventDuration, eventDate, attendeeLimit, eventCategory, createdBy
    ) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.venue = venue;
        this.shortDescription = shortDescription;
        this.details = details;
        this.eventDuration = eventDuration;
        this.eventDate = eventDate;
        this.attendeeLimit = attendeeLimit;
        this.eventCategory = eventCategory;
        this.createdBy = createdBy;
        this.createdAt = Date.now();
    }

}

module.exports = Event