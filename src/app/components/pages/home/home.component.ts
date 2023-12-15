import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { EventComponent } from '../../utilities/event/event.component';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/interfaces/event';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, EventComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Dependancy Injection
  private _router: Router = inject(Router);
  private _eventService: EventService = inject(EventService);
  private _snackBarService: SnackbarService = inject(SnackbarService);

  // Component Variables
  events$ !: Observable<Event[]>;

  ngOnInit() {
    this.events$ = this._eventService.getAllEvents().pipe(
      map(_serverResponse => _serverResponse.resource),
      catchError(_err => {
        this._snackBarService.openSnackBar('ERROR! Could not retrieve events from the server.');
        return of([]);
      })
    );
  }

  readonly aboutStats = [
    {
      digit: 2,
      tagLine: 'Unique Campuses Across Africa'
    },
    {
      digit: 7,
      tagLine: 'Hubs Across The Continent'
    },
    {
      digit: 3000,
      tagLine: 'Students To Change Africa'
    }
  ]

  readonly optionTiles = [
    {
      optionName: 'Attend An Event By ALU',
      optionIcon: './../../assets/images/event_calendar.png',
      buttonText: 'Events',
      pageLink: '/events'
    },
    {
      optionName: 'Give Back To Society',
      optionIcon: './../../assets/images/give_back.png',
      buttonText: 'Volunteer',
      pageLink: '/login'
    },
    {
      optionName: 'Explore Communites',
      optionIcon: './../../assets/images/explore.png',
      buttonText: 'Connect',
      pageLink: '/connect'
    }
  ]

  goToPage(routerLink: string): void {
    this._router.navigate([routerLink]);
  }

}