import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/interfaces/event';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirmation.component.html',
  styles: [`
    mat-dialog-actions button {
      width: 100%;
      flex: 1;
    }
    code{
      color : var(--var-black);
      font-weight: bold;
    }
  `]
})
export class ConfirmationComponent {

  // Readonly variables
  readonly event : Event;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _eventData : Event,
    private dialogReference : MatDialogRef<ConfirmationComponent>
  ) {
    this.event = _eventData;
  }

  // Method to delete event after confirmation
  deleteEvent(eventId : string) : void {
    console.log(eventId);
    this.dialogReference.close(true);
  }
}
