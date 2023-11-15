import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/interfaces/event';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

  // Triggers
  protected favourited: boolean = false;

  // Dependancy Injections
  private _snackBar: MatSnackBar = inject(MatSnackBar)
  private _authService: AuthService = inject(AuthService);

  // Component Variables
  isLoggedIn$ : Observable<boolean>;
  seatsRemaining: number;
  protected _event$: Event;

  // Get data passed
  constructor(
    @Inject(MAT_DIALOG_DATA) private _eventData$: {
      dialogState: boolean,
      dialogData: Event
    },
    private _eventDialogReference: MatDialogRef<EventDetailsComponent>
  ) {
    this._event$ = this._eventData$.dialogData;
    this.seatsRemaining = this._event$.attendeeLimit;
    this.isLoggedIn$ = this._authService.loginStatus$;
  }

  // Method to add event to favourites
  addToFavorites(): void {
    this.favourited = !this.favourited;

    let statusMessage = this.favourited ? `${this._event$.eventTitle} has been added to your favorites!` : `${this._event$.eventTitle} has been removed from your favorites!`;

    this._snackBar.open(statusMessage, "CLOSE",
      {
        duration: 3000,
        horizontalPosition: 'start'
      }
    );
  }

  // Method to reserve a seat
  reserveSpot() : void {
    this.seatsRemaining -- ;

    this._snackBar.open(`You have successfully reserved a spot for the ${this._event$.eventTitle} event!`, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'start'
    });
  }

}
