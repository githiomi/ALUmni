import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EventComponent } from '../../utilities/event/event.component';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/interfaces/event';

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
  private _authService : AuthService = inject(AuthService);
  private _eventService: EventService = inject(EventService);

  // Component Variables
  events$ !: Observable<Event[]>;
  isLoggedIn !: Observable<boolean>;

  ngOnInit() {
    this.events$ = this._eventService.getEvents();
    this.isLoggedIn = this._authService.loginStatus$;
  }

  readonly aboutStats = [
    {
      digit: 2,
      tagLine: 'Campuses Unique Across Africa'
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
      pageLink: '/volunteer'
    },
    {
      optionName: 'Explore Communites',
      optionIcon: './../../assets/images/explore.png',
      buttonText: 'Community',
      pageLink: '/community'
    }
  ]

  goToPage(routerLink : string) : void {
    this._router.navigate([routerLink]);
  }

}