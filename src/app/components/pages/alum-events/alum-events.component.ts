import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EventComponent } from '../../utilities/event/event.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-alum-events',
  standalone: true,
  imports: [CommonModule, MatCardModule, EventComponent, MatButtonModule],
  templateUrl: './alum-events.component.html',
  styleUrls: ['./alum-events.component.css']
})
export class AlumEventsComponent {

  // Dependency Injections
  private _router : Router = inject(Router);
  private _eventService: EventService = inject(EventService);

  readonly events: Event[];

  readonly manageTiles = [
    {
      manageName: 'Create A New University Event',
      manageIcon: './../../assets/images/event_calendar.png',
      buttonText: 'Create',
      pageLink: '/create'
    },
    {
      manageName: 'Manage Your Existing Events',
      manageIcon: './../../assets/images/give_back.png',
      buttonText: 'Manage',
      pageLink: '/manage'
    }
  ]

  constructor() {
    this.events = this._eventService.events;
  }

  goToPage(routerLink : string) : void {
    this._router.navigate([routerLink]);
  }

}
