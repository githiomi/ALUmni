import { CommonModule } from '@angular/common';
import { Event } from 'src/app/interfaces/event';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EventService } from 'src/app/services/event.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EventListComponent } from '../../utilities/event-list/event-list.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Animation Imports
import { LottieModule, AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule, LottieModule, EventListComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  // Const Paths
  private readonly fetchingAnimation = './../../../../assets/animations/fetching.json'
  private readonly noDataAnimation = './../../../../assets/animations/no_data.json'

  // Animation Options
  noDataAnimationOptions: AnimationOptions = { path: this.noDataAnimation }
  fetchingAnimationOptions: AnimationOptions = { path: this.fetchingAnimation }

  // Dependency injection
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);

  // Component variables
  fetching = true;
  filterForm: FormGroup;
  events$: Observable<Event[]>;;
  eventYears$: Observable<number[]>;
  eventCategories$: Observable<string[]>;
  eventLocations$: Observable<string[]>;

  constructor() {

    this.events$ = this._eventService.getEvents();
    this.eventYears$ = this._eventService.getYears();
    this.eventLocations$ = this._eventService.getEventLocations();
    this.eventCategories$ = this._eventService.getEventCategories();

    this.filterForm = this._formBuilder.group({
      eventCategory: new FormControl(''),
      eventLocation: new FormControl(''),
      eventYear: new FormControl('')
    }, 
    {
      updateOn: 'blur'
    });

    setTimeout ( () => this.fetching = false, 2000);
  }

  clearInputControl(event: any, formControlName: string) {
    event.stopPropagation();
    this.filterForm.controls[formControlName].setValue('');
  }

  clearFilters() {
    this.filterForm.reset();
    // this.events$ = this._eventService.events;
  }

  submitForm(filterForm: any): void {
    const formValues = filterForm.value;

    if (!formValues.eventCategory && !formValues.eventLocation && !formValues.eventYear) {
      this._matSnackBar.open(
        'No filter action was specified.',
        'CLOSE',
        {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'start'
        });

      return;
    }
    console.log(formValues);

    // Filter the events
    this.filterEvents(formValues);
  }

  // Method to perform filter
  filterEvents({ eventCategory, eventLocation }: any): void {
    // if (eventCategory && eventLocation)
    //   this.events$ = this.events$.filter((_event: Event) => _event.eventCategory === eventCategory && _event.venue === eventLocation)

    // this.events$ = this.events$.filter((_event: Event) => _event.eventCategory === eventCategory || _event.venue === eventLocation)
  }

}
