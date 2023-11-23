import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, concatMap, map, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/authResponse';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Readonly Variables
  private readonly BASE_URL = environment.alumni_base_url;

  // Dependancy Injections
  private _httpClient: HttpClient = inject(HttpClient);

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.isTokenPresent());
  loginStatus$ = this.isLoggedIn.asObservable();

  private loggedInUser: Subject<LoggedInUser> = new Subject();
  loggedInUser$: Observable<LoggedInUser> = this.loggedInUser.asObservable();

  private isTokenPresent(): boolean {
    return !!localStorage.getItem('auth_access_token');
  }

  getAccessToken() {
    return localStorage.getItem('auth_access_token');
  }

  getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.BASE_URL}users`);
  }

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
            this.changeLoginStatus(this.isTokenPresent());
          }
          return _res;
        }),
      );
  }

  logoutUser() {
    // Remove the token from the local storage
    localStorage.removeItem('auth_access_token');
    this.changeLoginStatus(this.isTokenPresent());
  }

}
