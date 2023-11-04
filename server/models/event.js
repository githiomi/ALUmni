let eventCounter = 1

class Event {

    constructor(
        eventTitle, venue, description, eventDuration, eventDate, attendeeLimit, eventCategory, createdBy
    ) {
        this.eventId = "EV00" + eventCounter;
        this.eventTitle = eventTitle;
        this.venue = venue;
        this.description = description;
        this.eventDuration = eventDuration;
        this.eventDate = eventDate;
        this.attendeeLimit = attendeeLimit;
        this.eventCategory = eventCategory;
        this.createdBy = createdBy;
        this.createdAt = Date.now();
        this.atendees = [];

        // Increment event counter
        eventCounter ++;
    }

}

module.exports = Event