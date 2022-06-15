import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { FollowUnfollowService } from 'src/app/services/follow-unfollow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fetchDataService: FetchDataService,
    private activatedRoute: ActivatedRoute,
    public FUS: FollowUnfollowService
  ) {}

  user$: Observable<any> | undefined;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.user$ = this.fetchDataService.getUserByID(params.id);
      } else {
        this.user$ = this.fetchDataService.getUserByID(
          sessionStorage.getItem('id')!
        );
      }
    });
  }
}
