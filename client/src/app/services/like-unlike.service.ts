import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FetchDataService } from './fetch-data.service';

@Injectable({
  providedIn: 'root',
})
export class LikeUnlikeService {
  private api = environment.api;

  constructor(private http: HttpClient, private FDS: FetchDataService) {}

  toggleLike(id: string, post: any) {
    if (this.isLiked(post.likes)) {
      if (post.likes[0].name) {
        post.likes = post.likes.filter(
          (like: any) => like._id !== this.FDS.currentUser._id
        );
      } else {
        post.likes = post.likes.filter(
          (like: any) => like !== this.FDS.currentUser._id
        );
      }
    } else {
      if (post.likes[0].name) {
        post.likes.push({
          _id: this.FDS.currentUser._id,
          name: this.FDS.currentUser.name,
        });
      } else {
        post.likes.push(this.FDS.currentUser._id);
      }
    }
    return this.http.put(`${this.api}/like/${id}`, {});
  }

  isLiked(likesArray: any[]) {
    if (!likesArray.length) {
      return false;
    }

    if (likesArray[0].name) {
      return likesArray.some((like) => like._id === this.FDS.currentUser._id);
    }
    return likesArray.includes(this.FDS.currentUser._id);
  }
}
