import { ViewChild, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Event } from 'src/app/interfaces/event';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationService } from 'src/app/services/animation.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import { Alumni } from 'src/app/interfaces/alumni';
import { User } from 'src/app/interfaces/user';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../utilities/confirmation/confirmation.component';
import { AlumniService } from 'src/app/services/alumni.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EventDetailsComponent } from '../../utilities/event-details/event-details.component';
import { ServerResponse } from 'src/app/interfaces/serverResponse';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatIconModule, MatTableModule, MatPaginatorModule, MatButtonModule, LottieModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Read only properties
  readonly defaultImage = "https://preview.redd.it/the-best-poses-for-girls-profile-pictures-v0-k3kxvh4czthb1.jpg?width=911&format=pjpg&auto=webp&s=5928c38dc54f0dbe37fc68519b2f23f2507e6d15";

  events: Event[] = [];
  users: Alumni[] = [];
  eventColumns: string[] = [
    "id",
    "title",
    "venue",
    "date",
    "category",
    "createdBy",
    "actions"
  ];
  alumniColumns: string[] = [
    "alumniId",
    "profilePictureUrl",
    "username",
    "fullName",
    "gender",
    "age",
    "graduationYear",
    "actions"
  ];

  // Dependancy Injections
  private _dialog: MatDialog = inject(MatDialog);
  private _matDialog: MatDialog = inject(MatDialog);
  private _eventService: EventService = inject(EventService);
  private _alumniService: AlumniService = inject(AlumniService);
  private _snackbarService: SnackbarService = inject(SnackbarService);
  private _animationService: AnimationService = inject(AnimationService);

  // Animation Options
  eventDataSource = new MatTableDataSource<Event>();
  alumniDataSource = new MatTableDataSource<Alumni>();
  noDataAnimationOptions: AnimationOptions = { path: this._animationService.getNoDataAnimationPath() };
  loadingAnimationOptions: AnimationOptions = { path: this._animationService.getLoadingAnimationPath() };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getEvents();
    this.getAlumni();
  }

  ngAfterViewInit() {
    this.eventDataSource.paginator = this.paginator;
  }

  getEvents() {
    this._eventService.getAllEvents().subscribe(
      _events => this.events = _events.resource
    );
    this.eventDataSource = new MatTableDataSource<Event>(this.events);
  }

  getAlumni() {
    this._alumniService.getAllAlumni().subscribe(
      _response => this.users = _response.resource
    )
    this.alumniDataSource = new MatTableDataSource<Alumni>(this.users);
  }

  updateEvent(state: boolean, event: Event): void {

    const dialogConfig: MatDialogConfig = {
      data: {
        editState: state,
        dialogData: event
      },
      width: '70%',
      height: '80%',
      autoFocus: false,
      disableClose: true,
      enterAnimationDuration: 700,
      exitAnimationDuration: 700
    }

    this._matDialog.open(EventDetailsComponent, dialogConfig).afterClosed().subscribe(
      (_res: boolean) => {
        if (_res) {
          this._snackbarService.openSnackBar(`The event with ID: ${event.eventId} was updated successfully.`);
          this.getEvents()
        }
      }
    );

  }

  deleteEvent(event: Event) {

    const confirmationDialogConfig: MatDialogConfig = {
      data: event.eventId,
      autoFocus: false,
      enterAnimationDuration: 700,
      exitAnimationDuration: 700,
      disableClose: true
    }

    // Open confirmation dialog
    let confirmationDialogRef = this._dialog.open(ConfirmationComponent, confirmationDialogConfig);

    confirmationDialogRef.afterClosed().subscribe(
      (confirmation: boolean) => {
        if (confirmation) {
          this._eventService.deleteEventById(event.eventId).subscribe(
            _deleteResponse => {
              this._snackbarService.openSnackBar(`The event with ID: ${event.eventId} has successfully been deleted from the database.`)
              this.getEvents();
            })
        }
      });

  }

  deleteAlumni(alumni: Alumni) {

    const confirmationDialogConfig: MatDialogConfig = {
      data: alumni.alumniId,
      autoFocus: false,
      enterAnimationDuration: 700,
      exitAnimationDuration: 700,
      disableClose: true
    }

    // Open confirmation dialog
    let confirmationDialogRef = this._dialog.open(ConfirmationComponent, confirmationDialogConfig);

    confirmationDialogRef.afterClosed().subscribe(
      (confirmation: boolean) => {
        if (confirmation)
          this._alumniService.deleteAlumniById(alumni.alumniId).subscribe(
            (_res: ServerResponse) => {
              this._snackbarService.openSnackBar(`The Alumni with ID ${alumni.alumniId} has successfully been deleted from the database.`)
              this.getAlumni();
            },
            (_err) =>
              this._snackbarService.openSnackBar(`Could not delete alumni with ID: ${alumni.alumniId}`)
          )
      }
    )

  }

}
