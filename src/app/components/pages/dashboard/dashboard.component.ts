import { AfterViewInit, ViewChild, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Event } from 'src/app/interfaces/event';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { AnimationService } from 'src/app/services/animation.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import { Alumni } from 'src/app/interfaces/alumni';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, MatIconModule, MatTableModule, MatPaginatorModule, LottieModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  events : Event[] = [];
  users : User[] = [];
  eventColumns : string[] = [
    "id",
    "title",
    "venue",
    "date",
    "category",
    "limit",
    "createdBy"
  ];
  alumniColumns : string[] = [
    "username",
    "role",
    "password"
    // "profilePictureUrl",
    // "alumniId",
    // "username",
    // "firstName",
    // "lastName",
    // "gender",
    // "age",
    // "graduationYear",
  ];
  
  // Dependancy Injections
  private _authService : AuthService = inject(AuthService);
  private _eventService : EventService = inject(EventService);
  private _animationService : AnimationService = inject(AnimationService);

  // Animation Options
  loadingAnimation : AnimationOptions = { path : this._animationService.getLoadingAnimationPath() };
  noDataAnimation : AnimationOptions = { path : this._animationService.getNoDataAnimationPath() };
  eventDataSource = new MatTableDataSource<Event>();
  alumniDataSource = new MatTableDataSource<Alumni>();

  constructor() {
    this._eventService.getEvents().subscribe(
      _events => this.events = _events
    );
    this.eventDataSource = new MatTableDataSource<Event>(this.events);

    this._authService.getAllUsers().subscribe(
      _users => this.users = _users
    )
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.eventDataSource.paginator = this.paginator;
  }

}
