import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DeleteService } from 'src/app/services/delete.service';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { LikeUnlikeService } from 'src/app/services/like-unlike.service';
import { PostDataService } from 'src/app/services/post-data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(
    public fds: FetchDataService,
    private activatedRoute: ActivatedRoute,
    public LUS: LikeUnlikeService,
    private PDS: PostDataService,
    private snackbar: SnackbarService,
    private ds: DeleteService
  ) {}

  id!: string;
  post$: Observable<any> | undefined;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.post$ = this.fds.getPostByID(params.id);
      this.id = params.id;
      this.comment.patchValue({
        post: params.id,
      });
    });
  }

  likedBy(likes: any[]) {
    return likes.map((like: any) => like.name).join(', ');
  }

  comment = new FormGroup({
    comment: new FormControl('', Validators.required),
    post: new FormControl('', Validators.required),
  });

  createComment() {
    this.comment.disable();
    this.PDS.createComment(this.comment.value, this.id).subscribe(
      () => {
        this.comment.reset();
        this.comment.patchValue({
          post: this.id,
        });
        this.snackbar.openSnackbar('Comment Created Successfully!');
        this.comment.enable();
      },
      () => {
        this.snackbar.openSnackbar('Error Creating Comment!');
        this.comment.enable();
      }
    );
  }

  deletedComments: any[] = [];

  deleteComment(id: string, event: any) {
    this.deletedComments.push(id);
    this.ds.deleteComment(id).subscribe(
      () => {
        this.snackbar.openSnackbar('Comment Deleted Successfully!');
      },
      (error) => {
        this.snackbar.openSnackbar(error.error.message);
      }
    );
  }
}
