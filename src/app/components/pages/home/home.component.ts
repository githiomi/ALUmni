import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly username = 'Daniel Githiomi';
  readonly profilePictureUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png';

  // Dependancy Injection
  private _router: Router = inject(Router);
  private _authService : AuthService = inject(AuthService);

  // Component Variables
  isLoggedIn !: Observable<boolean>;

  ngOnInit() {
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