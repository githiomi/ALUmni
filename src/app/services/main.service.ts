import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { Event } from '../interfaces/event';
import { Alumni } from '../interfaces/alumni';
import { concatMap, from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // Client Imports
  private _httpClient: HttpClient = inject(HttpClient);

  // Server Variables
  private readonly baseUrl = environment.alumni_base_url;

  getAllEvents(): Observable<Event[]> {
    return this._httpClient.get<Event[]>(`${this.baseUrl}/events`);
  }

  getEventById(eventId: string): Observable<Event> {
    return this._httpClient.get<Event>(`${this.baseUrl}/events/${eventId}`);
  }

  getEventAtendees(eventId: string): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this.baseUrl}/events/${eventId}/atendees`);
  }

  getEventAlumni(eventId: string): Observable<Alumni> {
    return this._httpClient.get<Alumni>(`${this.baseUrl}/events/${eventId}/atendees`);
  }

  getAllAlumni(): Observable<Alumni[]> {
    return this._httpClient.get<Alumni[]>(`${this.baseUrl}/alumni`);
  }

  getAlumniById(alumId: string): Observable<Alumni> {
    return this._httpClient.get<Alumni>(`${this.baseUrl}/alumni/${alumId.toUpperCase()}`);
  }

  getAlumniEvents(alumId: string): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this.baseUrl}/alumni/${alumId.toUpperCase()}/events`);
  }

  // getEventAlumni(eventId: string): Observable<Alumni> {
  //   return this._httpClient.get<string[]>(`${this.baseUrl}/events/${eventId}/atendees`).pipe(
  //     tap(_atendees => console.log(_atendees)),
  //     map(_attendees => from(_attendees)),
  //     concatMap(_atendee => this._httpClient.get<Alumni>(`${this.baseUrl}/alumni/${'ALU01'}`)
  //   ))
  // }


}
