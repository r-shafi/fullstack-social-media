import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  deleteComment(id: string) {
    return this.http.delete(`${this.api}/comment/${id}`);
  }
}
