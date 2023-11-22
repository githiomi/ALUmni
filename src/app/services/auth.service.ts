import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, concatMap, map, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/authResponse';
import { LoggedInUser } from '../interfaces/logged-in-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Readonly Variables
  private readonly BASE_URL = 'http://localhost:3001/';

  // Dependancy Injections
  private _httpClient: HttpClient = inject(HttpClient);

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loginStatus$ = this.isLoggedIn.asObservable();

  private loggedInUser: Subject<LoggedInUser> = new Subject();
  loggedInUser$ : Observable<LoggedInUser> = this.loggedInUser.asObservable();

  getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.BASE_URL}users`);
  }

  // Method to change login status
  changeLoginStatus(newStatus: boolean): void {
    this.isLoggedIn.next(newStatus);
  }

  loginUser(username: string, password: string): Observable<AuthResponse> {

    // Authenticate
    return this._httpClient.post<AuthResponse>(`${this.BASE_URL}auth/login`, { username, password })
      .pipe(
        tap(console.log),
        catchError(_err => throwError({
          message: "Incorrect username or password. Please check and try again"
        })),
        map((_res: AuthResponse) => {
          if (_res.accessToken) {
            // Store access token in local storage
            localStorage.setItem('auth_access_token', `Bearer ${_res.accessToken}`);
            
            // Get the user
            const resource = _res.resource;

            this.loggedInUser.next({
              alumniId: resource.alumniId,
              username: resource.username,
              role: resource.role,
              profilePictureUrl: resource.profilePictureUrl
            });

            // change login status
            this.changeLoginStatus(!!localStorage.getItem('auth_access_token'));
          }
          return _res;
        }),
      );
  }

  getLoggedInUser(username: string, password: string): Observable<User> {
    return this._httpClient.post<AuthResponse>(`${this.BASE_URL}auth/login`, { username, password })
      .pipe(
        concatMap(_authResponse => {
          let alumniId = _authResponse.resource.alumniId;

          return this._httpClient.get<User>(`${this.BASE_URL}alumni/${alumniId}`);
        })
      );
  }

}
