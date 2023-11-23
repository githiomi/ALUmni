export interface Event {
    eventId: string;
    eventBanner: string;
    eventTitle: string;
    venue: string;
    eventDescription: string;
    details: string;
    eventDuration: string;
    eventDate: Date;
    attendeeLimit: number;
    eventCategory: string;
    createdBy: string;
    createdAt: Date;
    attendees: string[];
}

