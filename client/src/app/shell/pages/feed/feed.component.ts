import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private fetchDataService: FetchDataService) {}

  feed$ = this.fetchDataService.feed$;

  ngOnInit(): void {
    location.pathname.split('/')[1] === 'feed'
      ? (this.feed$ = this.fetchDataService.feed$)
      : (this.feed$ = this.fetchDataService.public$);
  }
}
