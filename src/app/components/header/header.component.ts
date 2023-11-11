import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // Const variables
  readonly username : string = 'DGITHI280';
  readonly profilePictureUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png';

  // Dependancy Injection
  private _authService: AuthService = inject(AuthService);

  // Component Variables
  isLoggedIn: Observable<boolean> = this._authService.loginStatus$;

  changeStatus(status:boolean) : void {

    if (status === false)
      if (confirm(`${this.username}, are you sure you want to log out?`))
        this._authService.changeLoginStatus(status);
      else
        return;

    this._authService.changeLoginStatus(status);
  }

}