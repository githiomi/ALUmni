import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from 'src/app/interfaces/event';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  // Dependancy Injections
  private _matDialog: MatDialog = inject(MatDialog);

  // Component Variables
  @Input() event !: Event;

  openDetailsDialog(state : boolean): void {

    const dialogConfig: MatDialogConfig = {
      data: {
        editState: state,
        dialogData: this.event
      },
      width: '70%',
      height: '80%',
      autoFocus: false,
      disableClose: true,
      enterAnimationDuration: 700,
      exitAnimationDuration: 700
    }

    const eventDetailsDialog = this._matDialog.open(
      EventDetailsComponent, dialogConfig
    );

    eventDetailsDialog.afterClosed().subscribe(console.log);
  }

}
