import { CommonModule } from '@angular/common';
import { Event } from 'src/app/interfaces/event';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnimationService } from 'src/app/services/animation.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NewEventComponent } from '../../utilities/new-event/new-event.component';
import { EventListComponent } from '../../utilities/event-list/event-list.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Animation Imports
import { LottieModule, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatSnackBarModule, LottieModule, EventListComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  // Dependency injection
  _authService: AuthService = inject(AuthService);
  private _matDialog: MatDialog = inject(MatDialog);
  private _matSnackBar: MatSnackBar = inject(MatSnackBar);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _eventService: EventService = inject(EventService);
  private _snackbarService: SnackbarService = inject(SnackbarService);
  private _animationService: AnimationService = inject(AnimationService);

  // Animation Options
  noDataAnimationOptions: AnimationOptions = { path: this._animationService.getNoDataAnimationPath() };
  fetchingAnimationOptions: AnimationOptions = { path: this._animationService.getLoadingAnimationPath() }

  // Component variables
  fetching = true;
  events!: Event[];
  filterForm!: FormGroup;
  eventYears$: number[];
  eventLocations$: string[];
  eventCategories$: string[];

  constructor() {
    this.eventYears$ = this._eventService.years;
    this.eventLocations$ = this._eventService.eventLocations;
    this.eventCategories$ = this._eventService.eventCategories;
  }

  ngOnInit(): void {
    this.getEvents();
    this.filterFormInit();
  }

  private filterFormInit(): void {
    this.filterForm = this._formBuilder.group({
      eventCategory: new FormControl(''),
      eventLocation: new FormControl('')
    },
      {
        updateOn: 'blur'
      });
  }

  getEvents(): void {
    this.fetching = true;
    this._eventService.getAllEvents().subscribe(
      _response => {
        this.fetching = false;
        this.events = _response.resource
      },
      _err => {
        this.fetching = false;
        this._snackbarService.openSnackBar('Error! Could not retrieve events from the database', 'CLOSE');
      }
    )
  }

  clearInputControl(event: any, formControlName: string) {
    event.stopPropagation();
    this.filterForm.controls[formControlName].setValue('');
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.getEvents();
  }

  submitFilterForm(filterForm: any): void {
    const formValues = filterForm.value;

    if (!formValues.eventCategory && !formValues.eventLocation) {
      this._snackbarService.openSnackBar('No filter action was specified.', 'CLOSE');
      return;
    }

    // Filter the events
    this.filterEvents(formValues);
  }

  filterEvents({ eventCategory, eventLocation }: any): void {
    if (eventCategory && eventLocation)
      this.events = this.events.filter((_event: Event) => _event.eventCategory === eventCategory && _event.venue === eventLocation)

    this.events = this.events.filter((_event: Event) => _event.eventCategory === eventCategory || _event.venue === eventLocation)
  }

  createNewEvent(): void {
    const newEventDialogConfig: MatDialogConfig = {
      data: {
        editState: true,
        dialogData: null
      },
      width: '70%',
      height: '80%',
      autoFocus: false,
      disableClose: true,
      enterAnimationDuration: 700,
      exitAnimationDuration: 700
    }

    this._matDialog.open(NewEventComponent, newEventDialogConfig).afterClosed().subscribe(
      (_res: boolean) => {

        switch (_res) {
          case true:
            this._matSnackBar.open("You have successfully created a new event.", "Close", {
              duration: 3000,
              horizontalPosition: 'start'
            });
            this.getEvents();
            break;
          case false:
            this._matSnackBar.open("Error creating a new event. Try again later.", "Close", {
              duration: 3000
            });
            break;
        }

      }
    )
  }

}
