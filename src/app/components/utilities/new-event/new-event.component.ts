import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from 'src/app/services/auth.service';
import { MatNativeDateModule } from '@angular/material/core';
import { EventService } from 'src/app/services/event.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggedInUser } from 'src/app/interfaces/logged-in-user';
import { BehaviorSubject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {

  // Dependancy injections
  private _authService: AuthService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);

  // Component Variables
  newEventForm!: FormGroup;
  loading: boolean = false;
  eventLocations$: string[];
  eventCategories$: string[];

  constructor(
    private _dialogReference: MatDialogRef<NewEventComponent>
  ) {
    this.newEventFormInit();
    this.eventLocations$ = this._eventService.eventLocations;
    this.eventCategories$ = this._eventService.eventCategories;
  }

  private newEventFormInit(): void {
    this.newEventForm = this._formBuilder.group({
      eventTitle: new FormControl('', [Validators.required]),
      eventDescription: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      eventDuration: new FormControl('', [Validators.required]),
      eventCategory: new FormControl('', [Validators.required]),
      venue: new FormControl('', [Validators.required]),
      attendeeLimit: new FormControl('', [Validators.required, Validators.minLength(1)]),
      createdBy: new FormControl(this._authService.authenticatedUser()?.username, [Validators.required]),
      eventBanner: new FormControl('')
    })
  }

  submitForm(form: any): void {

    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.loading = true;
    const formValue = form.value

    const newEvent = {
      eventTitle: formValue.eventTitle,
      eventBanner: formValue.eventBanner,
      venue: formValue.venue,
      eventDescription: formValue.eventDescription,
      eventDuration: formValue.eventDuration,
      eventDate: formValue.eventDate,
      attendeeLimit: formValue.attendeeLimit,
      eventCategory: formValue.eventCategory,
      createdBy: formValue.createdBy
    }

    this._eventService.postNewEvent(newEvent).subscribe(
      res => {
        console.log(res);
        console.log('new event', newEvent);
        this.loading = false;
        this._dialogReference.close(true);
      },
      _ => {
        this.loading = false;
        this._dialogReference.close(false);
      }
    );

  }

}
