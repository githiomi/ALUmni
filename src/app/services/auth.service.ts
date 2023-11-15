import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Readonly Variables
  private readonly BASE_URL = 'http://localhost:3000/';

  // Dependancy Injections
  private _httpClient: HttpClient = inject(HttpClient);

  isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false);
  loginStatus$ = this.isLoggedIn.asObservable();

  getAllUsers() : Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.BASE_URL}users`);
  }

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

  private authenticate(username : string, password : string) : boolean {
    let expectedUserName = 'DGITHI280';
    let expectedPassword = 'qwertyuiop';

    return (username === expectedUserName && password === expectedPassword)
  }

}
