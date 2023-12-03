import { ViewChild, Component, inject } from '@angular/core';
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
import { AuthService } from 'src/app/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../utilities/confirmation/confirmation.component';
import { AlumniService } from 'src/app/services/alumni.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatIconModule, MatTableModule, MatPaginatorModule, MatButtonModule, LottieModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  readonly defaultImage = "https://preview.redd.it/the-best-poses-for-girls-profile-pictures-v0-k3kxvh4czthb1.jpg?width=911&format=pjpg&auto=webp&s=5928c38dc54f0dbe37fc68519b2f23f2507e6d15";

  events: Event[] = [];
  users: User[] = [];
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
  ];

  // Dependancy Injections
  private _dialog: MatDialog = inject(MatDialog);
  private _authService: AuthService = inject(AuthService);
  private _eventService: EventService = inject(EventService);
  private _alumniService: AlumniService = inject(AlumniService);
  private _animationService: AnimationService = inject(AnimationService);

  // Animation Options
  loadingAnimation: AnimationOptions = { path: this._animationService.getLoadingAnimationPath() };
  noDataAnimation: AnimationOptions = { path: this._animationService.getNoDataAnimationPath() };
  eventDataSource = new MatTableDataSource<Event>();
  alumniDataSource = new MatTableDataSource<Alumni>();

  constructor() {
    this._eventService.getAllEvents().subscribe(
      _events => this.events = _events.resource
    );
    this.eventDataSource = new MatTableDataSource<Event>(this.events);

    this._alumniService.getAllAlumni().subscribe(
      _response => this.users = _response.resource
    )
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.eventDataSource.paginator = this.paginator;
  }

  deleteEvent(event: Event) {

    const confirmationDialogConfig: MatDialogConfig = {
      data: event,
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
          console.log('Deletion confirmed. Deleting now!');
        else
          console.log('Deletion was cancelled!');
      }
    )

  }

}
