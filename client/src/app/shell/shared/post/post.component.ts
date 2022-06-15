import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interface/Post';
import { FollowUnfollowService } from 'src/app/services/follow-unfollow.service';
import { LikeUnlikeService } from 'src/app/services/like-unlike.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input('post') post!: Post;
  constructor(
    public FUS: FollowUnfollowService,
    public LUS: LikeUnlikeService
  ) {}
}
