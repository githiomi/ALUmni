import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, tap } from 'rxjs';
import { ServerResponse } from '../interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  // URLS
  readonly BASE_URL = environment.alumni_base_url;

  // Dependancy injetions
  private _httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getAllAlumni(): Observable<ServerResponse> {
    return this._httpClient.get<ServerResponse>(`${this.BASE_URL}alumni`).pipe(
      tap( console.log )
    )
  }
}
