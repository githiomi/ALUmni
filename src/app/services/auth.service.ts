import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false);
  loginStatus$ = this.isLoggedIn.asObservable();

  // Method to change login status
  changeLoginStatus(newStatus : boolean) : void {
    this.isLoggedIn.next(newStatus);
  }

  loginUser(username : string, password : string) : boolean {

    // Authenticate
    if (this.authenticate(username, password)){
      this.changeLoginStatus(true);
      return true;
    }
    else
      return false;
    
  }

  authenticate(username : string, password : string) : boolean {
    let expectedUserName = 'DGITHI280';
    let expectedPassword = 'qwertyuiop';

    return (username === expectedUserName && password === expectedPassword)

  }

}
