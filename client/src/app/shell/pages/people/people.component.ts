import { Component } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { FollowUnfollowService } from 'src/app/services/follow-unfollow.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  constructor(
    private fetchDataService: FetchDataService,
    public FUS: FollowUnfollowService
  ) {}

  users$ = this.fetchDataService.users$;
}
