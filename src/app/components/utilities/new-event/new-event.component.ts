import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { EventService } from 'src/app/services/event.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
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
      console.log('form is invalid');
      return;
    }

    this.loading = true;
    const formValue = form.value

    const newEvent = {
      eventTitle: formValue.eventTitle,
      eventBanner: formValue.eventBanner,
      venue: formValue.venue,
      shortDescription: formValue.eventDescription,
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
        console.log(res);
      },
      err => {
        this.loading = false;
        this._dialogReference.close(false);
        console.warn(err)
      }
    );

  }

}
