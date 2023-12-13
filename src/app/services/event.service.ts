import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Event } from '../interfaces/event';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { ServerResponse } from '../interfaces/serverResponse';
import { SnackbarService } from './snackbar.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  genders : string[] = [
    "Male",
    "Female"
  ]
  roles : string[] = [
    "Alumni",
    "Manager"
  ]
  eventCategories : string[] = [
    "Art",
    "Food",
    "Music",
    "Sports",
    "Science",
    "Fashion",
    "Business",
    "Literature",
    "Networking",
    "Technology",
    "Campus Event",
    "Health and Wellness",
    "Professional Development"
  ]
  eventLocations : string[] = [
    "Convention Center",
    "Art Studio",
    "City Park",
    "Outdoor Amphitheater",
    "Community Hall",
    "Beach Resort",
    "Historical Museum",
    "Botanical Garden",
    "Sports Arena",
    "Rooftop Lounge",
    "Tech Hub",
    "Downtown Square",
    "Culinary School",
    "University Auditorium",
    "Co-working Space",
    "Public Library",
    "Golf Course",
    "Warehouse Loft",
    "Luxury Hotel",
    "Fitness Center"
  ]
  years : number[] = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2018, 2019, 2020, 2021, 2022, 2023]

  // Dependacy Injection
  private _httpClient: HttpClient = inject(HttpClient);
  private _authService: AuthService = inject(AuthService);

  getEventById(eventId: string): Observable<Event> {
    return this._httpClient.get<ServerResponse>(`http://localhost:3001/events/${eventId}`).pipe(
      map((_response: ServerResponse) => _response.resource)
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
      catchError( _err => throwError(_err.message))
    );
  }

  updateEventById(eventId: string, payload : any): Observable<ServerResponse> {
    return this._httpClient.put<ServerResponse>(`http://localhost:3001/events/${eventId}`, payload).pipe(
      tap({
        error: console.log
      })
    );
  }

  getUserEvents(): Observable<ServerResponse> {
    return this._httpClient.get<ServerResponse>(`http://localhost:3001/alumni/${this._authService.authenticatedUser()?.alumniId}/events}`).pipe(
      tap({error: console.log}),
      catchError( _err => throwError(_err.message))
    )
  }

}
