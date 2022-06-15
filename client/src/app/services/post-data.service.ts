import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostDataService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  createPost(body: any) {
    return this.http.post(`${this.api}/post`, body);
  }

  createComment(body: any, id: string) {
    return this.http.post(`${this.api}/comment/${id}`, body);
  }
}
