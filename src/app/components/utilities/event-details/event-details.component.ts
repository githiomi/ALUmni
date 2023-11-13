import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/interfaces/event';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

  // Triggers
  protected favourited : boolean = false;

  // Dependancy Injections
  private _snackBar : MatSnackBar = inject(MatSnackBar)

  // Component Variables
  seatsRemaining : number = 0;
  protected _event$: Event;
  protected readonly event : Event = {
    eventId: "ALU01234",
    eventTitle: "Tech Expo 2023",
    venue: "Convention Center",
    shortDescription: "Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations Explore the latest in technology innovations",
    details: "Join us for a day of exciting tech exhibits and presentations.",
    eventDuration: "3 hours",
    eventDate: "2023-12-15T09:00:00Z",
    attendeeLimit: 150,
    eventCategory: "Technology",
    createdBy: "JohnDoe",
    createdAt: new Date,
    attendees: [],
    eventBanner: "https://th.bing.com/th/id/R.dc4f0a57312421ebc00eb0a9fffac1c8?rik=W%2f5gQweDXNe%2bwQ&pid=ImgRaw&r=0"
  }

  // Get data passed
  constructor(
    @Inject(MAT_DIALOG_DATA) private _eventData$: {
      dialogState: boolean,
      dialogData: Event
    },
    private _eventDialogReference: MatDialogRef<EventDetailsComponent>
  ) {
    // this._event$ = this.event;
    this._event$ = this._eventData$.dialogData;
  }

  // Method to add event to favourites
  addToFavorites() : void {
    this.favourited = !this.favourited;

    let statusMessage = this.favourited ? `${this._event$.eventTitle} has been added to your favorites!` : `${this._event$.eventTitle} has been removed from your favorites!`;

    this._snackBar.open(statusMessage, "CLOSE",
      {
        duration: 3000,
        horizontalPosition: 'start'
      }
    );
  }

}
