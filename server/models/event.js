let eventCounter = 1

class Event {

    constructor(
        eventTitle, eventBanner = "https://pxl-duracuk.terminalfour.net/prod01/channel_3/business/media/durham-university-business-school/events/Home-Page-Banner-or-Footer-(16).png", description, venue, eventDuration, eventDate, attendeeLimit, eventCategory, createdBy
    ) {
        this.eventId = "EV00" + eventCounter;
        this.eventBanner = eventBanner;
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