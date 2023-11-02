import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this._mainService.getEventAlumni('EV001').subscribe(
      alumni => console.log(alumni)
    )
  }

  // Service Imports
  private _mainService: MainService = inject(MainService);

  // Local Variables
  alumni$!: Observable<string[]>;

  getAtendeesForEvent(): void {
    this.alumni$ = this._mainService.getEventAtendees('EV001');
  }

}