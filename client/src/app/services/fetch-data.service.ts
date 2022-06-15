import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../interface/Post';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  private api = environment.api;
  currentUser: any;

  constructor(private http: HttpClient) {}

  feed$ = this.http.get<Post[]>(`${this.api}/post/feed`);
  public$ = this.http.get<Post[]>(`${this.api}/post/public`);

  users$ = this.http.get<any[]>(`${this.api}/user`);

  getUserByID(id: string) {
    return this.http.get<any[]>(`${this.api}/user/${id}`);
  }

  currentUser$ = this.http.get<any>(`${this.api}/user/me`).pipe(
    tap((data) => {
      this.currentUser = data;
    })
  );

  getPostByID(id: string) {
    return this.http.get<any[]>(`${this.api}/post/${id}`).pipe(
      catchError((error: any) => {
        // redirect to / show snackbar
        console.log(error);
        console.log(error.error.error);
        return of([]);
      })
    );
  }

  isLoggedInUser(id: string) {
    return this.currentUser && this.currentUser._id === id;
  }
}
