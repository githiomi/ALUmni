import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Dependancy Injection
  private _authService: AuthService = inject(AuthService);

  // Component Variables
  isLoggedIn: Observable<boolean> = this._authService.loginStatus$;

  login() : void {
    console.log('Login Button Clicked')
  }

  changeStatus(status:boolean) : void {
    this._authService.changeLoginStatus(status);
  }

}