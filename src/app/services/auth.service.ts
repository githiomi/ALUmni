import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { environment } from 'src/environments/environment.development';
import { ServerResponse } from '../interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Readonly Variables
  private readonly BASE_URL = environment.alumni_base_url;

  // Dependancy Injections
  private _httpClient: HttpClient = inject(HttpClient);

  // Class variables
  authenticatedUser = signal<LoggedInUser | null | undefined>(undefined);
  loggedInStatus = signal<boolean>(this.isTokenPresent());

  constructor() {
    if (this.isTokenPresent()) {
      localStorage.removeItem('auth_access_token');
      this.loggedInStatus.set(this.isTokenPresent())
    }
  }

  private isTokenPresent(): boolean {
    return !!localStorage.getItem('auth_access_token');
  }

  getAccessToken() {
    return localStorage.getItem('auth_access_token') ?? '';
  }

  registerUser(newUser: any): Observable<ServerResponse> {
    return this._httpClient.post<ServerResponse>(`${this.BASE_URL}auth/register`, newUser).pipe(
      tap({
        error: console.log
      }),
      catchError(_err => {
        console.log(_err);
        return throwError("Unexpected error occured when creating a new user.");
      })
    )
  }

  loginUser(username: string, password: string): Observable<ServerResponse> {
    return this._httpClient.post<ServerResponse>(`${this.BASE_URL}auth/login`, { username, password })
      .pipe(
        catchError(_err => throwError({
          message: "Incorrect username or password. Please check and try again"
        })),
        tap((_res: ServerResponse) => {
          if (_res.accessToken) {
            // Store access token in local storage
            localStorage.setItem('auth_access_token', `Bearer ${_res.accessToken}`);

            // Get the user
            const resource = _res.resource;

            this.authenticatedUser.set(resource);
            this.loggedInStatus.set(this.isTokenPresent());
          }
          return _res;
        }),
      );
  }

  logoutUser() {
    // Remove the token from the local storage
    localStorage.removeItem('auth_access_token');
    this.authenticatedUser.set(null);
    this.loggedInStatus.set(this.isTokenPresent());
  }

}
