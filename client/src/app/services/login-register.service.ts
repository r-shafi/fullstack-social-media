import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterService {
  api = environment.api;

  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post(`${this.api}/login`, body);
  }

  register(body: any) {
    return this.http.post(`${this.api}/register`, body);
  }
}
