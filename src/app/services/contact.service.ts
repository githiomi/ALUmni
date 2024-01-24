import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../interfaces/serverResponse';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly contactUrl : string = 'http://localhost:3001/contact';

  // Dependency Injection
  private _httpClient : HttpClient = inject(HttpClient);

  postMessage(message : any) : Observable<ServerResponse> {
    return this._httpClient.post<ServerResponse>(this.contactUrl, message)
  };
}
