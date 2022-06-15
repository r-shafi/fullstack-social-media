import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  logout() {
    return this.http.get(`${this.api}/logout`);
  }
}
