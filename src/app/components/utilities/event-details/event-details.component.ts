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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule, MatSelectModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  // Triggers
  protected editMode: boolean;
  protected submitting = false;
  protected favourited: boolean = false;

  // Dependancy Injections
  private _matDialog: MatDialog = inject(MatDialog);
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);
  private _snackBarService: SnackbarService = inject(SnackbarService);

  // Component Variables
  seatsRemaining: number;
  protected _event$: Event;
  editEventForm!: FormGroup;
  isLoggedIn$: Observable<boolean>;
  eventLocations$: string[] = this._eventService.eventLocations;
  eventCategories$: string[] = this._eventService.eventCategories;

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
    if (this._eventData$.dialogData != null)
      this.eventFormInit();
  }

  private eventFormInit(): void {
    if (this.editMode)
      this.editEventForm = this._formBuilder.group({
        eventTitle: new FormControl(this._event$.eventTitle, [Validators.required]),
        eventDescription: new FormControl(this._event$.eventDescription, [Validators.required]),
        eventDate: new FormControl(this._event$.eventDate, [Validators.required]),
        eventDuration: new FormControl(this._event$.eventDuration, [Validators.required]),
        eventCategory: new FormControl(this._event$.eventCategory, [Validators.required]),
        venue: new FormControl(this._event$.venue, [Validators.required]),
        attendeeLimit: new FormControl(this._event$.attendeeLimit, [Validators.required, Validators.minLength(1)]),
        eventBanner: new FormControl(this._event$.eventBanner, [Validators.required])
      })
  }

  // Method to delete an event
  deleteEvent(): void {
    const validationConfig: MatDialogConfig = {
      data: this._event$.eventId,
      autoFocus: false,
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      disableClose: true
    }

    // Open confirmation dialog
    let confirmationDialogRef = this._matDialog.open(ConfirmationComponent, validationConfig);

    confirmationDialogRef.afterClosed().subscribe(
      (confirmation: boolean) => {
        if (confirmation) {
          this._eventService.deleteEventById(this._event$.eventId).subscribe(
            res => {
              this._snackBarService.openSnackBar(`The event with ID: ${this._event$.eventId} has successfully been deleted from the database.`, 'CLOSE');
              this._eventDialogReference.close();
            },
            err => {
              this._snackBarService.openSnackBar(err.message, 'CLOSE');
              this._eventDialogReference.close();
            }
          )
        }
      });
  }

  addToFavorites(): void {
    this.favourited = !this.favourited;
    let statusMessage = this.favourited ? `${this._event$.eventTitle} has been added to your favorites!` : `${this._event$.eventTitle} has been removed from your favorites!`;
    this._snackBarService.openSnackBar(statusMessage);
  }

  reserveSpot(): void {
    this.seatsRemaining--;
    this._snackBarService.openSnackBar(`You have successfully reserved a spot for the ${this._event$.eventTitle} event!`);
  }

  submitUpdateForm(form: any): void {

    if (form.invalid) {
      console.warn("Update Form is invalid");
      return;
    }

    this.submitting = true;
    const formValues = form.value;

    this._eventService.updateEventById(this._event$.eventId, formValues).subscribe(
      _res => {
        console.log(_res);
        this.submitting = false;
        this._eventDialogReference.close(true);
      },
      _err => {
        console.log(_err);
        this.submitting = false;
        this._eventDialogReference.close(false);
      }
    )
  }

}
