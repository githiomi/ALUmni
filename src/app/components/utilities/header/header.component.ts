import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { LoggedInUser } from 'src/app/interfaces/logged-in-user';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatMenuModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // Dependancy Injection
  private _router: Router = inject(Router);
  private _authService: AuthService = inject(AuthService);

  // Component Variables
  currentUser$ !: LoggedInUser;
  private userSubscription$: Subscription | undefined;
  isLoggedIn: Observable<boolean> = this._authService.loginStatus$;

  ngOnInit() {
    this.userSubscription$ = this._authService.loggedInUser$.subscribe(
      res => this.currentUser$ = res
    )
  }

  changeStatus(status: boolean): void {
    if (status === false)
      if (confirm(`${this.currentUser$.username}, are you sure you want to log out?`))
        this._authService.changeLoginStatus(status);
      else
        return;
    this._authService.changeLoginStatus(status);
  }

  logoutUser(): void {
    this._authService.logoutUser();
    this._router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    if (this.userSubscription$ !== null && this.userSubscription$ !== undefined)
      this.userSubscription$.unsubscribe();
  }

}