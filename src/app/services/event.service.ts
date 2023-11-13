import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public readonly eventCategories: string[] = [
    'Art',
    'Food',
    'Music',
    'Sports',
    'Science',
    'Fashion',
    'Business',
    'Literature',
    'Networking',
    'Technology',
    'Campus Event',
    'Health and Wellness',
    'Professional Development',
  ]

  public readonly eventLocations: string[] = [
    'Convention Center',
    'Art Studio',
    'City Park',
    'Outdoor Amphitheater',
    'Community Hall',
    'Beach Resort',
    'Historical Museum',
    'Botanical Garden',
    'Sports Arena',
    'Rooftop Lounge',
    'Tech Hub',
    'Downtown Square',
    'Culinary School',
    'University Auditorium',
    'Co-working Space',
    'Public Library',
    'Golf Course',
    'Warehouse Loft',
    'Luxury Hotel',
    'Fitness Center'
  ]

  public readonly eventYears: number[] = [
    2014, 2015, 2016, 2017, 2018, 2018, 2019, 2020, 2021, 2022, 2023
  ]

  public readonly events = [
    {
      eventId: "ALU01234",
      eventTitle: "Tech Expo 2023",
      venue: "Convention Center",
      shortDescription: "Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations",
      details: "Join us for a day of exciting tech exhibits and presentations.",
      eventDuration: "3 hours",
      eventDate: "2023-12-15T09:00:00Z",
      attendeeLimit: 11,
      eventCategory: "Technology",
      createdBy: "JohnDoe",
      createdAt: new Date,
      attendees: [],
      eventBanner: "https://th.bing.com/th/id/R.dc4f0a57312421ebc00eb0a9fffac1c8?rik=W%2f5gQweDXNe%2bwQ&pid=ImgRaw&r=0"
    },
    {
      eventId: "ALU05678",
      eventTitle: "Artistic Expression Workshop",
      venue: "Art Studio",
      shortDescription: "Unleash your creativity through various art forms",
      details: "A hands-on workshop for artists of all levels. Bring your imagination!",
      eventDuration: "4 hours",
      eventDate: "2023-11-20T14:30:00Z",
      attendeeLimit: 80,
      eventCategory: "Art",
      createdBy: "JaneSmith",
      createdAt: new Date(),
      attendees: [],
      eventBanner: "https://www.coventry.ac.uk/globalassets/media/global/open-day-2021/visitor-guide-open-day-767-368.jpg"
    },
    {
      eventId: "ALU09876",
      eventTitle: "Food Festival",
      venue: "City Park",
      shortDescription: "A culinary journey with diverse cuisines",
      details: "Indulge in a variety of delicious dishes from around the world.",
      eventDuration: "6 hours",
      eventDate: "2023-10-05T17:00:00Z",
      attendeeLimit: 200,
      eventCategory: "Food",
      createdBy: "RobertJohnson",
      createdAt: new Date(),
      attendees: [],
      eventBanner: "https://pxl-duracuk.terminalfour.net/prod01/channel_3/business/media/durham-university-business-school/events/Home-Page-Banner-or-Footer-(16).png"
    },
    {
      eventId: "ALU03456",
      eventTitle: "Music Concert",
      venue: "Outdoor Amphitheater",
      shortDescription: "An evening of live music under the stars",
      details: "Enjoy performances by talented musicians in a beautiful outdoor setting.",
      eventDuration: "5 hours",
      eventDate: "2023-09-15T19:00:00Z",
      attendeeLimit: 120,
      eventCategory: "Music",
      createdBy: "ChrisMiller",
      createdAt: new Date(0),
      attendees: [],
      eventBanner: "https://www.uq.edu.au/sites/default/files/styles/card_image/public/2022-05/alumni-community-event.jpg?h=a81fead4&itok=OYRffluV"
    },
    {
      eventId: "ALU11223",
      eventTitle: "Sports Challenge",
      venue: "Sports Complex",
      shortDescription: "Compete in various sports and test your athletic skills",
      details: "A day of friendly competition and sportsmanship.",
      eventDuration: "8 hours",
      eventDate: "2023-08-10T10:00:00Z",
      attendeeLimit: 180,
      eventCategory: "Sports",
      createdBy: "AlexJohnson",
      createdAt: new Date(),
      attendees: [],
      eventBanner: "https://events.utk.edu/wp-content/uploads/sites/65/2019/01/firstgen.jpg"
    }
  ]

}
