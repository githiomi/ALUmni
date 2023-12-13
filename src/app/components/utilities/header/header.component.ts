import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LoggedInUser } from 'src/app/interfaces/logged-in-user';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatMenuModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Dependancy Injection
  private _router: Router = inject(Router);
  _authService: AuthService = inject(AuthService);
  private _snackbarService: SnackbarService = inject(SnackbarService);

  logoutUser(): void {
    this._snackbarService.openSnackBar(`${this._authService.authenticatedUser()?.username}, you have successfully logged out.`);
    this._authService.logoutUser();
    this._router.navigate(['/home']);
  }

}