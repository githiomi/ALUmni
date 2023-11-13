import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/interfaces/event';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Animation Imports
import { LottieModule, AnimationOptions } from 'ngx-lottie';
import { EventListComponent } from '../../utilities/event-list/event-list.component';

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
  fetchingAnimationOptions : AnimationOptions = {
    path: this.fetchingAnimation
  }

  noDataAnimationOptions : AnimationOptions = {
    path: this.noDataAnimation
  }

  // Dependency injection
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);

  // Component variables
  events$ : any;
  fetching = false;
  eventYears: number[];
  filterForm: FormGroup;
  eventCategories: string[];
  eventLocations: string[];

  constructor() {

    this.events$ = this._eventService.events;
    this.eventCategories = this._eventService.eventCategories;
    this.eventLocations = this._eventService.eventLocations;
    this.eventYears = this._eventService.eventYears;

    this.filterForm = this._formBuilder.group({
      eventCategory: new FormControl(''),
      eventLocation: new FormControl(''),
      eventYear: new FormControl('')
    });

    // setTimeout ( () => this.fetching = false, 2000);
  }

  clearInputControl (event : any, formControlName : string) {
    event.stopPropagation();
    this.filterForm.controls[formControlName].setValue('');
  }

  submitForm(filterForm: any): void {
    const formValues = filterForm.value;

    if (!formValues.eventCategory && !formValues.eventLocation && !formValues.eventYear){
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
  }

}
