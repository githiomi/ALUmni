import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  // Dependancy injections
  private _snackBar : MatSnackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string = '', duration: number = 3000) {
    this._snackBar.open(
      message,
      action,
      {
        duration: duration,
        verticalPosition: 'bottom',
        horizontalPosition: 'start'
      }
    );
  }

}
