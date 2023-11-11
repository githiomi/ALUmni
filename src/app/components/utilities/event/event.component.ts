import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  @Input() event !: any;
  eventImage : string = "./../../../assets/images/event_banner.jpg"

}
