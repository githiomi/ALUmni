export interface Event {
    eventId: string;
    eventTitle: string;
    venue: string;
    shortDescription: string;
    details: string;
    eventDuration: string;
    eventDate: string;
    attendeeLimit: number;
    eventCategory: string;
    createdBy: string;
    createdAt: Date;
    atendees: string[];
}