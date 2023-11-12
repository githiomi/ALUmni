import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EventComponent } from '../../utilities/event/event.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Observable, concatMap, interval, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, MatCardModule, EventComponent, MatButtonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  private _router : Router = inject(Router);

  readonly events = [
    {
      eventId: "ALU01234",
      eventTitle: "Tech Expo 2023",
      venue: "Convention Center",
      shortDescription: "Explore the latest in technology innovations",
      details: "Join us for a day of exciting tech exhibits and presentations.",
      eventDuration: "3 hours",
      eventDate: "2023-12-15T09:00:00Z",
      attendeeLimit: 150,
      eventCategory: "Technology",
      createdBy: "JohnDoe",
      createdAt: Date.now(),
      atendees: ["Alice", "Bob", "Charlie"]
    },
    {
      eventId: "ALU05678",
      eventTitle: "Artistic Expression Workshop In Angular",
      venue: "Art Studio",
      shortDescription: "Unleash your creativity through various art forms",
      details: "A hands-on workshop for artists of all levels. Bring your imagination!",
      eventDuration: "4 hours",
      eventDate: "2023-11-20T14:30:00Z",
      attendeeLimit: 80,
      eventCategory: "Art",
      createdBy: "JaneSmith",
      createdAt: Date.now(),
      atendees: ["Eva", "David", "Grace"]
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
      createdAt: Date.now(),
      atendees: ["Olivia", "Frank", "Sophia"]
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
      createdAt: Date.now(),
      atendees: ["Liam", "Emma", "Noah"]
    }
  ]

  readonly manageTiles = [
    {
      manageName: 'Create A New University Event',
      manageIcon: './../../assets/images/event_calendar.png',
      buttonText: 'Create',
      pageLink: '/create'
    },
    {
      manageName: 'Manage Your Existing Events',
      manageIcon: './../../assets/images/give_back.png',
      buttonText: 'Manage',
      pageLink: '/manage'
    }
  ]

  goToPage(routerLink : string) : void {
    this._router.navigate([routerLink]);
  }

}
