import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FetchDataService } from './fetch-data.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class FollowUnfollowService {
  private api = environment.api;

  constructor(
    private http: HttpClient,
    private fetchDataService: FetchDataService,
    private snackbar: SnackbarService
  ) {}

  toggleFollow(id: string) {
    if (this.isFollowing(id)) {
      this.fetchDataService.currentUser.following =
        this.fetchDataService.currentUser.following.filter(
          (user: any) => user !== id
        );
      this.snackbar.openSnackbar('Unfollowed Successfully!');
    } else {
      this.fetchDataService.currentUser.following.push(id);
      this.snackbar.openSnackbar('Followed Successfully!');
    }
    return this.http.put(`${this.api}/follow/${id}`, {});
  }

  isFollowing(id: string) {
    return this.fetchDataService.currentUser.following.includes(id);
  }

  isUser(id: string) {
    return this.fetchDataService.currentUser._id === id;
  }
}
