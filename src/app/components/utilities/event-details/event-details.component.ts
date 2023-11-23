import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/interfaces/event';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  // Triggers
  protected favourited: boolean = false;
  protected editMode: boolean;

  // Dependancy Injections
  private _matDialog : MatDialog = inject(MatDialog);
  private _snackBar: MatSnackBar = inject(MatSnackBar)
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);

  // Component Variables
  seatsRemaining: number;
  protected _event$: Event;
  editEventForm!: FormGroup;
  isLoggedIn$: Observable<boolean>;
  eventLocations$: Observable<string[]> = this._eventService.getEventLocations();
  eventCategories$: Observable<string[]> = this._eventService.getEventCategories();

  // Get data passed
  constructor(
    @Inject(MAT_DIALOG_DATA) private _eventData$: {
      editState: boolean,
      dialogData: Event
    },
    private _eventDialogReference: MatDialogRef<EventDetailsComponent>
  ) {
    this.editMode = this._eventData$.editState;
    this._event$ = this._eventData$.dialogData;
    this.seatsRemaining = this._event$.attendeeLimit;
    this.isLoggedIn$ = this._authService.loginStatus$;
  }

  ngOnInit() {
    // Event Form Initialization
    if (this.editMode)
      this.editEventForm = this._formBuilder.group({
        eventTitle: new FormControl(this._event$.eventTitle, [Validators.required]),
        eventDescription: new FormControl(this._event$.shortDescription, [Validators.required]),
        eventDate: new FormControl(this._event$.eventDate, [Validators.required]),
        eventDuration: new FormControl(this._event$.eventDuration, [Validators.required]),
        eventCategory: new FormControl(this._event$.eventCategory, [Validators.required]),
        venue: new FormControl(this._event$.venue, [Validators.required]),
        attendeeLimit: new FormControl(this._event$.attendeeLimit, [Validators.required, Validators.minLength(1)]),
      })
  }

  // Method to delete an event
  deleteEvent(): void {

    const validationConfig: MatDialogConfig = {
      data: this._event$,
      autoFocus: false,
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      disableClose: true
    }

    // Open confirmation dialog
    let confirmationDialogRef = this._matDialog.open(ConfirmationComponent, validationConfig);

    confirmationDialogRef.afterClosed().subscribe(
      (confirmation : boolean) => {
        if (confirmation) {
          console.log('Deletion confirmed. Deleting now!');

          this._eventService.deleteEventById(this._event$.eventId).subscribe(
            res => console.log(res),
            err => console.warn(err)            
          )
        }
      }
    )

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
  reserveSpot(): void {
    this.seatsRemaining--;

    this._snackBar.open(`You have successfully reserved a spot for the ${this._event$.eventTitle} event!`, 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'start'
    });
  }

  submitForm(form: any): void {
    const formValues = form.value;

    console.log(formValues);
  }

}
