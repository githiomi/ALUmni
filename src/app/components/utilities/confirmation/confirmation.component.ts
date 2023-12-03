import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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
  readonly id : string;

  constructor(@Inject(MAT_DIALOG_DATA) private _receivedId : string) {
    this.id = this._receivedId;
  }

}
