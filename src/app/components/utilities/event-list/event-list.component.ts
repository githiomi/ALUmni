import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from 'src/app/interfaces/event';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  // Dependancy injections
  private _matDialog: MatDialog = inject(MatDialog);

  @Input() _event$ !: Event;
  @Input() isOwner !: boolean;
  @Output() eventListEmitter = new EventEmitter<boolean>;

  openDetailsDialog(state: boolean): void {
    const dialogConfig: MatDialogConfig = {
      data: {
        editState: state,
        deleteFlag: this.isOwner,
        dialogData: this._event$
      },
      width: '70%',
      height: '80%',
      autoFocus: false,
      disableClose: true,
      enterAnimationDuration: 700,
      exitAnimationDuration: 700
    }

    this._matDialog.open(EventDetailsComponent, dialogConfig).afterClosed().subscribe(
      (_res: boolean) => this.eventListEmitter.emit(_res)
    );
  }

}
