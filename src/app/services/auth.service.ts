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


}
