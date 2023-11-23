import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Event } from '../interfaces/event';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ServerResponse } from '../interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // Readonly Variables
  private readonly BASE_URL = 'http://localhost:3000/';

  // Dependacy Injection
  private _httpClient: HttpClient = inject(HttpClient);

  // Data Retrieval Methods
  getEvents(): Observable<Event[]> {
    return this._httpClient.get<Event[]>(`${this.BASE_URL}events`).pipe(
      tap(console.log)
    );
  }

  getYears(): Observable<number[]> {
    return this._httpClient.get<number[]>(`${this.BASE_URL}years`).pipe(
      tap(console.log)
    );
  }

  getEventLocations(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this.BASE_URL}eventLocations`).pipe(
      tap(console.log)
    );
  }

  getEventCategories(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this.BASE_URL}eventCategories`).pipe(
      tap(console.log)
    );
  }

  getGenders(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this.BASE_URL}genders`).pipe(
      tap(console.log)
    );
  }

  getRoles(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this.BASE_URL}roles`).pipe(
      tap(console.log)
    );
  }

  deleteEventById(eventId: string): Observable<ServerResponse> {
    return this._httpClient.delete<ServerResponse>(`http://localhost:3001/events/${eventId}`).pipe(
      tap({
        error: console.log
      })
    );
  }

  postNewEvent(event: any): Observable<ServerResponse> {
    return this._httpClient.post<ServerResponse>(`http://localhost:3001/events/new`, event).pipe(
      tap({
        error: console.log
      })
    );
  }

  getAllEvents(): Observable<ServerResponse> {
    return this._httpClient.get<ServerResponse>(`http://localhost:3001/events`).pipe(
      tap({
        error: console.log
      }),
      catchError( _err => {
        return of(_err.message)
      })
    );
  }

}
