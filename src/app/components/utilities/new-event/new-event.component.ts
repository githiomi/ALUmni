import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EventService } from 'src/app/services/event.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent {

  // Dependancy injections
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);

  // Component Variables
  newEventForm!: FormGroup;
  loading: boolean = false;
  eventLocations$: Observable<string[]>;
  eventCategories$: Observable<string[]>;

  constructor(
    private _dialogReference : MatDialogRef<NewEventComponent>
  ) {
    this.newEventFormInit()

    this.eventCategories$ = this._eventService.getEventCategories();
    this.eventLocations$ = this._eventService.getEventLocations();
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
      createdBy: 'TBD'
    }

    this._eventService.postNewEvent(newEvent).subscribe(
      res => {
        this.loading = false;
        this._dialogReference.close(true);
      },
      err => {
        this.loading = false;
        this._dialogReference.close(false);
      }
    );

  }

}
