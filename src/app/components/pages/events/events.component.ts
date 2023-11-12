import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EventService } from 'src/app/services/event.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  // Dependency injection
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);

  // Component variables
  filterForm: FormGroup;
  eventCategories: string[];
  eventLocations: string[];
  eventYears: number[];

  constructor() {

    this.eventCategories = this._eventService.eventCategories;
    this.eventLocations = this._eventService.eventLocations;
    this.eventYears = this._eventService.eventYears;

    this.filterForm = this._formBuilder.group({
      eventCategory: new FormControl(''),
      eventLocation: new FormControl(''),
      eventYear: new FormControl('')
    })
  }

  submitForm(filterForm: any): void {
    const formValues = filterForm.value;

    if (!formValues.eventCategory && !formValues.eventLocation && !formValues.eventYear)
      this._matSnackBar.open(
        'No filter action was specified.',
        'CLOSE',
        {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'start'
        });
  }

}
