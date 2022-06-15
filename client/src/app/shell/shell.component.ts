import { Component } from '@angular/core';
import { FetchDataService } from '../services/fetch-data.service';
import { LazyDialogService } from '../services/lazy-dialog.service';
import { LogoutService } from '../services/logout.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  constructor(
    private logoutService: LogoutService,
    public lazyDialog: LazyDialogService,
    private fetchDataService: FetchDataService
  ) {}

  currentUser$ = this.fetchDataService.currentUser$;

  logout() {
    this.logoutService.logout().subscribe(() => {
      sessionStorage.clear();
      location.reload();
    });
  }
}
